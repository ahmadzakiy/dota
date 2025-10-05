"use client"
import Image from "next/image"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getHeroAvatar, getHeroName } from "@/lib/opendota-api"
import type { WrappedData } from "@/lib/types"

const PERCENTAGE_MULTIPLIER = 100
const HIGH_WIN_RATE_THRESHOLD = 50

type HerosSectionProps = {
  data: WrappedData
}

export function HeroesSection({ data }: HerosSectionProps) {
  const [heroSearchTerm, setHeroSearchTerm] = useState("")
  const [heroFilterBy, setHeroFilterBy] = useState<"games" | "win" | "winPercentage" | "lose">(
    "games",
  )

  // Helper functions for hero filtering and sorting
  const getHeroWinPercentage = (hero: { games: number; win: number }): number => {
    return hero.games > 0 ? (hero.win / hero.games) * PERCENTAGE_MULTIPLIER : 0
  }

  const getHeroLosses = (hero: { games: number; win: number }): number => {
    return hero.games - hero.win
  }

  // Filter and sort heroes based on search term and filter option
  const getFilteredAndSortedHeroes = () => {
    let filteredHeroes = data.heroes

    // Filter by search term
    if (heroSearchTerm.trim()) {
      filteredHeroes = filteredHeroes.filter((hero) =>
        getHeroName(hero.hero_id).toLowerCase().includes(heroSearchTerm.toLowerCase().trim()),
      )
    }

    // Sort based on filter option
    const sortedHeroes = [...filteredHeroes].sort((a, b) => {
      switch (heroFilterBy) {
        case "games":
          return b.games - a.games
        case "win":
          return b.win - a.win
        case "winPercentage":
          return getHeroWinPercentage(b) - getHeroWinPercentage(a)
        case "lose":
          return getHeroLosses(b) - getHeroLosses(a)
        default:
          return b.games - a.games
      }
    })

    return sortedHeroes
  }

  const filteredHeroes = getFilteredAndSortedHeroes()

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="font-semibold text-2xl">Heroes</CardTitle>
        <CardDescription>Your warriors of feeding and glory</CardDescription>
      </CardHeader>

      {/* Search and Filter Controls */}
      <div className="px-6">
        <div className="flex flex-col gap-3">
          <Input
            className="w-full"
            onChange={(e) => setHeroSearchTerm(e.target.value)}
            placeholder="Search by hero name..."
            value={heroSearchTerm}
          />
          <Select
            onValueChange={(value: "games" | "win" | "winPercentage" | "lose") =>
              setHeroFilterBy(value)
            }
            value={heroFilterBy}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="games">Total matches played</SelectItem>
              <SelectItem value="winPercentage">Wins percentage</SelectItem>
              <SelectItem value="win">Wins played with</SelectItem>
              <SelectItem value="lose">Losses played with</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <CardContent>
        {filteredHeroes.length > 0 ? (
          <ScrollArea className="h-[340px] w-full">
            <div className="space-y-4">
              {filteredHeroes.map((hero, index) => {
                const heroWinRate =
                  hero.games > 0
                    ? ((hero.win / hero.games) * PERCENTAGE_MULTIPLIER).toFixed(1)
                    : "0.0"
                const lossCount = hero.games - hero.win

                return (
                  <div
                    className="flex items-start space-x-3 rounded-lg border border-border/50 bg-muted/50 p-3 transition-colors hover:bg-muted/50"
                    key={hero.hero_id}
                  >
                    <Image
                      alt={getHeroName(hero.hero_id)}
                      className="mt-1 h-8 w-8 rounded-full border border-border object-cover"
                      height={24}
                      src={getHeroAvatar(hero.hero_id)}
                      width={24}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between">
                        <h4 className="truncate font-semibold text-sm">
                          {getHeroName(hero.hero_id)}
                        </h4>
                        <Badge className="h-5 min-w-5 font-mono tabular-nums" variant="outline">
                          #{index + 1}
                        </Badge>
                      </div>
                      <div className="mt-1 text-muted-foreground text-xs">
                        <div className="flex justify-between">
                          <span className="text-white">{hero.games} matches</span>
                        </div>
                        <div className="mt-1 flex justify-between">
                          <span>
                            <span>{hero.win} wins</span> & <span>{lossCount} losses</span>
                          </span>
                          <span
                            className={`font-mono tabular-nums ${
                              Number.parseFloat(heroWinRate) > HIGH_WIN_RATE_THRESHOLD
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {heroWinRate}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        ) : (
          <div className="py-8 text-center">
            <h3 className="mb-2 font-semibold text-lg">No Heroes Found</h3>
            <p className="text-muted-foreground text-sm">
              Try another hero's name or clear the search box
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
