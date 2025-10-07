"use client"
import { useState } from "react"
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
import type { WrappedData } from "@/lib/types"

const SECONDS_IN_MINUTE = 60
const SECONDS_IN_HOUR = 3600
const THOUSAND = 1000
const MILLION = 1_000_000

type TotalStatsSectionProps = {
  data: WrappedData
}

export function TotalStatsSection({ data }: TotalStatsSectionProps) {
  const [statSearchTerm, setStatSearchTerm] = useState("")
  const [statSortColumn, setStatSortColumn] = useState<"field" | "sum" | "average" | "n">("sum")
  const [statSortOrder, setStatSortOrder] = useState<"asc" | "desc">("desc")

  // Helper function to format statistic names
  const formatStatName = (field: string): string => {
    const nameMap: Record<string, string> = {
      kills: "⚔️ Kills",
      deaths: "💀 Deaths",
      assists: "🤝 Assists",
      kda: "📊 KDA Ratio",
      gold_per_min: "💰 Gold Per Minute",
      xp_per_min: "⭐ Experience Per Minute",
      last_hits: "🎯 Last Hits",
      denies: "🚫 Denies",
      hero_damage: "💥 Hero Damage",
      tower_damage: "🏗️ Tower Damage",
      hero_healing: "💚 Hero Healing",
      duration: "⏱️ Match Duration",
      level: "🔢 Final Level",
      win: "🏆 Wins",
      lose: "😭 Losses",
      stuns: "⚡ Stun Duration",
      camps_stacked: "🏕️ Camps Stacked",
      rune_pickups: "🔮 Rune Pickups",
      firstblood_claimed: "🩸 First Bloods",
      teamfight_participation: "⚔️ Teamfight Participation",
      obs_placed: "👁️ Observer Wards Placed",
      sen_placed: "🔍 Sentry Wards Placed",
      creeps_stacked: "🐛 Creeps Stacked",
      lane_efficiency_pct: "📈 Lane Efficiency",
      purchase_tpscroll: "🌀 TP Scrolls Bought",
      purchase_ward_observer: "👁️ Observer Wards Bought",
      purchase_ward_sentry: "🔍 Sentry Wards Bought",
      purchase_gem: "💎 Gems Bought",
      purchase_rapier: "⚔️ Rapiers Bought",
      pings: "📢 Pings",
      throw: "🤡 Throws",
      comeback: "🔄 Comebacks",
      stomp: "🚀 Stomps",
    }
    return (
      nameMap[field] || `📊 ${field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`
    )
  }

  // Helper function to format duration values
  const formatDurationValue = (value: number, isAverage: boolean): string => {
    return isAverage
      ? `${Math.round(value / SECONDS_IN_MINUTE)}m`
      : `${Math.round(value / SECONDS_IN_HOUR)}h`
  }

  // Helper function to format large numbers (damage/healing)
  const formatLargeNumber = (value: number): string => {
    if (value >= MILLION) {
      return `${(value / MILLION).toFixed(1)}M`
    }
    if (value >= THOUSAND) {
      return `${(value / THOUSAND).toFixed(0)}K`
    }
    return Math.round(value).toLocaleString()
  }

  // Helper function to check if field is a large number type
  const isLargeNumberField = (field: string): boolean => {
    return field === "hero_damage" || field === "tower_damage" || field === "hero_healing"
  }

  // Helper function to format statistic values
  const formatStatValue = (field: string, value: number, isAverage = false): string => {
    if (field === "duration") {
      return formatDurationValue(value, isAverage)
    }

    if (isLargeNumberField(field)) {
      return formatLargeNumber(value)
    }

    if (field === "stuns") {
      return `${value.toFixed(1)}s`
    }
    if (field === "lane_efficiency_pct") {
      return `${value.toFixed(1)}%`
    }
    if (field === "kda" || isAverage) {
      return value.toFixed(2)
    }

    return Math.round(value).toLocaleString()
  }

  // Helper function to get sort value for stats
  const getStatSortValue = (stat: { field: string; sum: number; n: number }, column: string) => {
    switch (column) {
      case "field":
        return formatStatName(stat.field)
      case "sum":
        return stat.sum
      case "average":
        return stat.n > 0 ? stat.sum / stat.n : 0
      case "n":
        return stat.n
      default:
        return stat.sum
    }
  }

  // Filter and sort stats
  const getFilteredAndSortedStats = () => {
    if (!data?.totals) {
      return []
    }

    let filteredStats = data.totals

    // Filter by search term
    if (statSearchTerm.trim()) {
      filteredStats = filteredStats.filter((stat) =>
        formatStatName(stat.field).toLowerCase().includes(statSearchTerm.toLowerCase().trim()),
      )
    }

    // Sort stats
    const sortedStats = [...filteredStats].sort((a, b) => {
      const aValue = getStatSortValue(a, statSortColumn)
      const bValue = getStatSortValue(b, statSortColumn)

      if (typeof aValue === "string" && typeof bValue === "string") {
        return statSortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return statSortOrder === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number)
    })

    return sortedStats
  }

  const filteredStats = getFilteredAndSortedStats()

  return (
    <Card className="relative bg-card backdrop-blur-md">
      <CardHeader>
        <CardTitle className="flex flex-col items-start justify-between gap-2 font-semibold text-2xl md:flex-row">
          Total Statistics
          <Input
            className="max-w-sm"
            onChange={(e) => setStatSearchTerm(e.target.value)}
            placeholder="Search by statistic name..."
            value={statSearchTerm}
          />
        </CardTitle>
        <CardDescription>Your stats (the good, the bad, & the feeding)</CardDescription>
      </CardHeader>
      <CardContent>
        {filteredStats.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      const newOrder =
                        statSortColumn === "field" && statSortOrder === "desc" ? "asc" : "desc"
                      setStatSortColumn("field")
                      setStatSortOrder(newOrder)
                    }}
                  >
                    Statistic Name{" "}
                    {statSortColumn === "field" && (statSortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      const newOrder =
                        statSortColumn === "sum" && statSortOrder === "desc" ? "asc" : "desc"
                      setStatSortColumn("sum")
                      setStatSortOrder(newOrder)
                    }}
                  >
                    Total Value {statSortColumn === "sum" && (statSortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      const newOrder =
                        statSortColumn === "average" && statSortOrder === "desc" ? "asc" : "desc"
                      setStatSortColumn("average")
                      setStatSortOrder(newOrder)
                    }}
                  >
                    Average Value{" "}
                    {statSortColumn === "average" && (statSortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      const newOrder =
                        statSortColumn === "n" && statSortOrder === "desc" ? "asc" : "desc"
                      setStatSortColumn("n")
                      setStatSortOrder(newOrder)
                    }}
                  >
                    Total Games {statSortColumn === "n" && (statSortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStats.map((stat) => {
                  const average = stat.n > 0 ? stat.sum / stat.n : 0

                  return (
                    <TableRow key={stat.field}>
                      <TableCell className="font-medium text-xs">
                        {formatStatName(stat.field)}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {formatStatValue(stat.field, stat.sum)}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {formatStatValue(stat.field, average, true)}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{stat.n.toLocaleString()}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="py-8 text-center">
            <h3 className="mb-2 font-semibold text-lg">No Statistics Found</h3>
            <p className="text-muted-foreground text-sm">
              Try another search term or clear the search box
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
