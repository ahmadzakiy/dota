"use client"
import Image from "next/image"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate, getHeroAvatar, getHeroName } from "@/lib/opendota-api"
import type { Match, WrappedData } from "@/lib/types"

const PLAYER_SLOT_DIRE_THRESHOLD = 128

type RecentMatchesSectionProps = {
  data: WrappedData
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <improve next time>
export function RecentMatchesSection({ data }: RecentMatchesSectionProps) {
  const [matchSearchTerm, setMatchSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<keyof Match | "is_win" | "side">("start_time")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Helper function to get sort values for a match
  const getSortValue = (match: Match, column: keyof Match | "is_win" | "side"): number | string => {
    switch (column) {
      case "match_id":
        return match.match_id
      case "start_time":
        return match.start_time
      case "is_win": {
        const isRadiant = match.player_slot < PLAYER_SLOT_DIRE_THRESHOLD
        const won = isRadiant === match.radiant_win
        return won ? 1 : 0
      }
      case "side":
        return match.player_slot < PLAYER_SLOT_DIRE_THRESHOLD ? "Radiant" : "Dire"
      case "hero_id":
        return getHeroName(match.hero_id)
      case "duration":
        return match.duration
      case "deaths":
        return match.deaths
      case "kills":
        return match.kills
      case "assists":
        return match.assists
      case "gold_per_min":
        return match.gold_per_min || 0
      case "xp_per_min":
        return match.xp_per_min || 0
      case "last_hits":
        return match.last_hits || 0
      default:
        return match.start_time
    }
  }

  // Helper function to compare two values with sort order
  const compareValues = (aValue: number | string, bValue: number | string): number => {
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return sortOrder === "asc"
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number)
  }

  // Filter and sort recent matches
  const getFilteredAndSortedMatches = () => {
    if (!data?.recentMatches) {
      return []
    }

    let filteredMatches = data.recentMatches

    // Filter by hero name search
    if (matchSearchTerm.trim()) {
      filteredMatches = filteredMatches.filter((match) =>
        getHeroName(match.hero_id).toLowerCase().includes(matchSearchTerm.toLowerCase().trim()),
      )
    }

    // Sort based on selected column
    const sortedMatches = [...filteredMatches].sort((a, b) => {
      const aValue = getSortValue(a, sortColumn)
      const bValue = getSortValue(b, sortColumn)
      return compareValues(aValue, bValue)
    })

    return sortedMatches
  }

  const filteredMatches = getFilteredAndSortedMatches()

  return (
    <Card className="relative bg-card/80 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="flex flex-col items-start justify-between gap-2 font-semibold text-2xl md:flex-row">
          Recent Matches
          <Input
            className="max-w-sm"
            onChange={(e) => setMatchSearchTerm(e.target.value)}
            placeholder="Search by hero name..."
            value={matchSearchTerm}
          />
        </CardTitle>
        <CardDescription>Your questionable life choices in sortable form</CardDescription>
      </CardHeader>
      <CardContent>
        {filteredMatches.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      const newOrder =
                        sortColumn === "match_id" && sortOrder === "desc" ? "asc" : "desc"
                      setSortColumn("match_id")
                      setSortOrder(newOrder)
                    }}
                  >
                    Match ID {sortColumn === "match_id" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      const newOrder =
                        sortColumn === "start_time" && sortOrder === "desc" ? "asc" : "desc"
                      setSortColumn("start_time")
                      setSortOrder(newOrder)
                    }}
                  >
                    Start Time {sortColumn === "start_time" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      const newOrder =
                        sortColumn === "is_win" && sortOrder === "desc" ? "asc" : "desc"
                      setSortColumn("is_win")
                      setSortOrder(newOrder)
                    }}
                  >
                    Result {sortColumn === "is_win" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      const newOrder =
                        sortColumn === "side" && sortOrder === "desc" ? "asc" : "desc"
                      setSortColumn("side")
                      setSortOrder(newOrder)
                    }}
                  >
                    Side {sortColumn === "side" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      const newOrder =
                        sortColumn === "hero_id" && sortOrder === "desc" ? "asc" : "desc"
                      setSortColumn("hero_id")
                      setSortOrder(newOrder)
                    }}
                  >
                    Hero {sortColumn === "hero_id" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      const newOrder =
                        sortColumn === "duration" && sortOrder === "desc" ? "asc" : "desc"
                      setSortColumn("duration")
                      setSortOrder(newOrder)
                    }}
                  >
                    Duration {sortColumn === "duration" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      const newOrder =
                        sortColumn === "kills" && sortOrder === "desc" ? "asc" : "desc"
                      setSortColumn("kills")
                      setSortOrder(newOrder)
                    }}
                  >
                    K {sortColumn === "kills" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      const newOrder =
                        sortColumn === "deaths" && sortOrder === "desc" ? "asc" : "desc"
                      setSortColumn("deaths")
                      setSortOrder(newOrder)
                    }}
                  >
                    D {sortColumn === "deaths" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      const newOrder =
                        sortColumn === "assists" && sortOrder === "desc" ? "asc" : "desc"
                      setSortColumn("assists")
                      setSortOrder(newOrder)
                    }}
                  >
                    A {sortColumn === "assists" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      const newOrder =
                        sortColumn === "gold_per_min" && sortOrder === "desc" ? "asc" : "desc"
                      setSortColumn("gold_per_min")
                      setSortOrder(newOrder)
                    }}
                  >
                    GPM {sortColumn === "gold_per_min" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      const newOrder =
                        sortColumn === "xp_per_min" && sortOrder === "desc" ? "asc" : "desc"
                      setSortColumn("xp_per_min")
                      setSortOrder(newOrder)
                    }}
                  >
                    XPM {sortColumn === "xp_per_min" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      const newOrder =
                        sortColumn === "last_hits" && sortOrder === "desc" ? "asc" : "desc"
                      setSortColumn("last_hits")
                      setSortOrder(newOrder)
                    }}
                  >
                    LH {sortColumn === "last_hits" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMatches.map((match) => {
                  const isRadiant = match.player_slot < PLAYER_SLOT_DIRE_THRESHOLD
                  const won = isRadiant === match.radiant_win
                  const side = isRadiant ? "Radiant" : "Dire"
                  const duration = `${Math.floor(match.duration / 60)}:${String(match.duration % 60).padStart(2, "0")}`

                  return (
                    <TableRow key={match.match_id}>
                      <TableCell className="font-mono text-xs">{match.match_id}</TableCell>
                      <TableCell className="text-xs">{formatDate(match.start_time)}</TableCell>
                      <TableCell>
                        <Badge className="text-xs" variant={won ? "success" : "destructive"}>
                          {won ? "Win" : "Loss"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="text-xs" variant={isRadiant ? "secondary" : "default"}>
                          {side}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Image
                          alt={getHeroName(match.hero_id)}
                          className="h-6 w-6 rounded-full border object-cover"
                          height={24}
                          src={getHeroAvatar(match.hero_id)}
                          width={24}
                        />
                        <span className="truncate text-xs">{getHeroName(match.hero_id)}</span>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{duration}</TableCell>
                      <TableCell className="font-mono text-green-400 text-xs">
                        {match.kills}
                      </TableCell>
                      <TableCell className="font-mono text-red-400 text-xs">
                        {match.deaths}
                      </TableCell>
                      <TableCell className="font-mono text-blue-400 text-xs">
                        {match.assists}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-yellow-400">
                        {match.gold_per_min}
                      </TableCell>
                      <TableCell className="font-mono text-purple-400 text-xs">
                        {match.xp_per_min}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{match.last_hits}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="py-8 text-center">
            <h3 className="mb-2 font-semibold text-lg">No Matches Found</h3>
            <p className="text-muted-foreground text-sm">
              Try another hero's name or clear the search box
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
