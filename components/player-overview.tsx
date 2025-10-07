"use client"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import {
  formatDate,
  getHeroName,
  getRankIconUrl,
  getRankName,
  getRankStars,
  getRankStarUrl,
  isWin,
} from "@/lib/opendota-api"
import type { WrappedData } from "@/lib/types"

const PERCENTAGE_MULTIPLIER = 100
const HIGH_WIN_RATE_THRESHOLD = 50
const TOP_PLAYER_THRESHOLD = 55
const BASIC_PLAYER_THRESHOLD = 45
const MILLISECONDS_TO_SECONDS = 1000
const HOURS_IN_DAY = 24
const MINUTES_IN_HOUR = 60
const SECONDS_IN_MINUTE = 60
const MILLISECONDS_PER_DAY =
  MILLISECONDS_TO_SECONDS * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY
const DAYS_PER_YEAR = 365
const VETERAN_YEARS_THRESHOLD = 10
const EXPERIENCED_YEARS_THRESHOLD = 5
const YEAR_IN_DAYS = 365
const LONG_TIME_DAYS = 100
const MONTH_IN_DAYS = 30
const EXCELLENT_KDA = 3
const GOOD_KDA = 2
const DECENT_KDA = 1.5
const MINIMUM_KDA = 1
const IMMORTAL_RANK_TIER = 8
const RANK_TIER_DIVISOR = 10

// Helper function to get funny time spent message
const getTimeSinceFirstMatch = (firstMatchTimestamp: number): string => {
  const firstMatchDate = new Date(firstMatchTimestamp * MILLISECONDS_TO_SECONDS)
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - firstMatchDate.getTime())
  const diffDays = Math.ceil(diffTime / MILLISECONDS_PER_DAY)
  const diffYears = Math.floor(diffDays / DAYS_PER_YEAR)

  if (diffYears > 0) {
    const yearText = diffYears > 1 ? "years" : "year"
    if (diffYears >= VETERAN_YEARS_THRESHOLD) {
      return `${diffYears} ${yearText} of your life gone to Dota`
    }
    if (diffYears >= EXPERIENCED_YEARS_THRESHOLD) {
      return `${diffYears} ${yearText} of questionable life choices`
    }
    return `${diffYears} ${yearText} of feeding and tears`
  }

  if (diffDays >= YEAR_IN_DAYS) {
    return "Almost a year of ruining friendships"
  }
  if (diffDays >= LONG_TIME_DAYS) {
    return `${diffDays} days of avoiding real responsibilities`
  }
  if (diffDays >= MONTH_IN_DAYS) {
    return `${diffDays} days of "just one more game"`
  }

  return `${diffDays} day${diffDays > 1 ? "s" : ""} of pure addiction`
}

// Helper function to get funny KDA summary using existing KDA field
const getKDASummary = (kdaValue: number): string => {
  if (kdaValue >= EXCELLENT_KDA) {
    return `${kdaValue.toFixed(2)} KDA is actually respectable`
  }
  if (kdaValue >= GOOD_KDA) {
    return `${kdaValue.toFixed(2)} KDA isn't completely embarrassing`
  }
  if (kdaValue >= DECENT_KDA) {
    return ` ${kdaValue.toFixed(2)} KDA raises some questions`
  }
  if (kdaValue >= MINIMUM_KDA) {
    return `${kdaValue.toFixed(2)} KDA suggests you enjoy feeding`
  }

  return `${kdaValue.toFixed(2)} KDA screams professional feeder`
}

// Helper function to extract totals from PlayerTotals array
const getTotalValue = (totals: { field: string; sum: number }[], field: string): number => {
  const total = totals.find((item) => item.field === field)
  return total ? total.sum : 0
}

// Helper function to get player badge based on win rate
const getPlayerBadge = (
  winRate: number,
): { variant: "success" | "secondary" | "destructive"; label: string } => {
  if (winRate >= TOP_PLAYER_THRESHOLD) {
    return { variant: "success", label: "Top player" }
  }
  if (winRate >= BASIC_PLAYER_THRESHOLD) {
    return { variant: "secondary", label: "Basic player" }
  }
  return { variant: "destructive", label: "Goblin player" }
}

type PlayerOverviewProps = {
  data: WrappedData
}

export function PlayerOverview({ data }: PlayerOverviewProps) {
  const winRate =
    data.totalMatches > 0
      ? ((data.winLoss.win / data.totalMatches) * PERCENTAGE_MULTIPLIER).toFixed(1)
      : "0.0"

  return (
    <div className="flex flex-col gap-6">
      {/* User Profile */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="font-mono tabular-nums">{`ID: ${
            data.player?.profile?.account_id || "Unknown"
          }`}</CardDescription>
          <CardTitle className="flex gap-2 font-semibold @[250px]/card:text-3xl text-2xl">
            {data.player?.profile?.personaname}
          </CardTitle>
          <CardAction>
            <Avatar className="size-12 shadow-[0_0_20px_rgb(231,0,11),0_0_40px_rgb(231,0,11,0.6),0_0_60px_rgb(231,0,11,0.4),0_0_80px_rgb(231,0,11,0.2)] ring-1 ring-primary/30">
              <AvatarImage src={data.player?.profile?.avatarfull} />
              <AvatarFallback>{data.player?.profile?.personaname?.charAt(0)}</AvatarFallback>
            </Avatar>
          </CardAction>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Your first match was{" "}
            {data.firstMatch?.start_time ? formatDate(data.firstMatch.start_time) : "Unknown"}
          </div>
          <div className="text-muted-foreground">
            You picked {data.firstMatch?.hero_id ? getHeroName(data.firstMatch.hero_id) : "Unknown"}{" "}
            and {data.firstMatch && isWin(data.firstMatch) ? "somehow won" : "got rekt"}
          </div>
        </CardContent>
      </Card>

      {/* Win Rate */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Win Rate</CardDescription>
          <CardTitle
            className={`font-mono font-semibold @[250px]/card:text-3xl text-2xl tabular-nums ${
              Number.parseFloat(winRate) > HIGH_WIN_RATE_THRESHOLD
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {winRate}%
          </CardTitle>
          <CardAction>
            {(() => {
              const badge = getPlayerBadge(Number.parseFloat(winRate))
              return <Badge variant={badge.variant}>{badge.label}</Badge>
            })()}
          </CardAction>
        </CardHeader>
        <CardContent className="text-sm">
          <div className={"line-clamp-1 flex gap-2 font-medium"}>
            You {Number.parseFloat(winRate) > HIGH_WIN_RATE_THRESHOLD ? "fought" : "fed"} in{" "}
            {data.totalMatches} matches
          </div>
          <div className="text-muted-foreground">
            {data.winLoss.win} wins & {data.winLoss.lose} losses
          </div>
        </CardContent>
      </Card>

      {/* User Rank */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Current Rank</CardDescription>
          <CardTitle
            className={`font-semibold @[250px]/card:text-3xl text-2xl ${
              Math.floor((data.rank?.rank_tier || 0) / RANK_TIER_DIVISOR) === IMMORTAL_RANK_TIER
                ? "text-amber-600 dark:text-amber-400"
                : ""
            }`}
          >
            {getRankName(data.rank?.rank_tier)}
          </CardTitle>
          <CardAction>
            <div className="relative h-16 w-16">
              {/* Only show star icon if not Immortal rank */}
              {Math.floor((data.rank?.rank_tier || 0) / RANK_TIER_DIVISOR) !==
                IMMORTAL_RANK_TIER && (
                <Image
                  alt="Ranked star icon"
                  className="absolute inset-0 h-full w-full"
                  height={48}
                  src={getRankStarUrl(getRankStars(data.rank?.rank_tier))}
                  width={48}
                />
              )}
              <Image
                alt="Ranked medal icon"
                className="absolute inset-0 h-full w-full"
                height={48}
                src={getRankIconUrl(data.rank?.rank_tier) || "/placeholder.svg"}
                width={48}
              />
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="flex-col items-start gap-1.5 text-sm">
          <div className={"line-clamp-1 flex gap-2 font-medium"}>
            {getTimeSinceFirstMatch(data.firstMatch?.start_time || 0)}
          </div>
          <div className="text-muted-foreground">
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="cursor-help underline decoration-dotted">
                  {getKDASummary(getTotalValue(data.totals, "kda") / data.totalMatches)}
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-64">
                <div className="space-y-2">
                  <h4 className="text-center font-semibold text-sm">Kills / Deaths / Assists</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-green-600 dark:text-green-400">
                        {getTotalValue(data.totals, "kills")}
                      </div>
                      <div className="text-muted-foreground text-xs">Kills</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-red-600 dark:text-red-400">
                        {getTotalValue(data.totals, "deaths")}
                      </div>
                      <div className="text-muted-foreground text-xs">Deaths</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-yellow-600 dark:text-yellow-400">
                        {getTotalValue(data.totals, "assists")}
                      </div>
                      <div className="text-muted-foreground text-xs">Assists</div>
                    </div>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-xs">
                      <span>Average per game:</span>
                      <span>
                        {(getTotalValue(data.totals, "kills") / data.totalMatches).toFixed(1)}/
                        {(getTotalValue(data.totals, "deaths") / data.totalMatches).toFixed(1)}/
                        {(getTotalValue(data.totals, "assists") / data.totalMatches).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
