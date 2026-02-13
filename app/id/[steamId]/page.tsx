import { Suspense } from "react"
import { FriendsSection } from "@/components/friends-section"
import { HeroesSection } from "@/components/heroes-section"
import { CardSkeleton, TableSkeleton } from "@/components/loading-skeletons"
import { PlayerOverview } from "@/components/player-overview"
import { RecentMatchesSection } from "@/components/recent-matches-section"
import { SocialSharing } from "@/components/social-sharing"
import { TotalStatsSection } from "@/components/total-stats-section"
import {
  getCachedPlayer,
  getCachedPlayerFirstMatch,
  getCachedPlayerHeroes,
  getCachedPlayerPeers,
  getCachedPlayerRank,
  getCachedPlayerRecentMatches,
  getCachedPlayerTotals,
  getCachedPlayerWinLoss,
} from "@/lib/opendota-api"
import type { WrappedData } from "@/lib/types"

type PageProps = {
  params: Promise<{ steamId: string }>
}

// Cache this page for 1 day (86400 seconds) - player stats don't change frequently
export const revalidate = 86_400

// Streaming wrapper for PlayerOverview - fetches core player data
async function PlayerOverviewWrapper({ steamId }: { steamId: string }) {
  const [player, winLoss, rank, totals, firstMatch] = await Promise.all([
    getCachedPlayer(steamId),
    getCachedPlayerWinLoss(steamId),
    getCachedPlayerRank(steamId),
    getCachedPlayerTotals(steamId),
    getCachedPlayerFirstMatch(steamId),
  ])

  const data: WrappedData = {
    player,
    rank,
    winLoss,
    firstMatch,
    totalMatches: winLoss.win + winLoss.lose,
    recentMatches: [],
    topFriends: [],
    heroes: [],
    records: {
      maxKills: 0,
      maxDeaths: 0,
      maxAssists: 0,
      maxGPM: 0,
      maxDuration: 0,
      avgKills: 0,
      avgDeaths: 0,
      avgAssists: 0,
      avgGPM: 0,
      avgDuration: 0,
    },
    totals,
  }

  return <PlayerOverview data={data} />
}

// Streaming wrapper for FriendsSection
async function FriendsSectionWrapper({ steamId }: { steamId: string }) {
  const peers = await getCachedPlayerPeers(steamId)

  const data: WrappedData = {
    player: {} as WrappedData["player"],
    rank: undefined,
    winLoss: { win: 0, lose: 0 },
    firstMatch: undefined,
    totalMatches: 0,
    recentMatches: [],
    topFriends: peers.sort((a, b) => b.games - a.games).slice(0, 10),
    heroes: [],
    records: {
      maxKills: 0,
      maxDeaths: 0,
      maxAssists: 0,
      maxGPM: 0,
      maxDuration: 0,
      avgKills: 0,
      avgDeaths: 0,
      avgAssists: 0,
      avgGPM: 0,
      avgDuration: 0,
    },
    totals: [],
  }

  return <FriendsSection data={data} />
}

// Streaming wrapper for HeroesSection
async function HeroesSectionWrapper({ steamId }: { steamId: string }) {
  const heroes = await getCachedPlayerHeroes(steamId)

  const data: WrappedData = {
    player: {} as WrappedData["player"],
    rank: undefined,
    winLoss: { win: 0, lose: 0 },
    firstMatch: undefined,
    totalMatches: 0,
    recentMatches: [],
    topFriends: [],
    heroes,
    records: {
      maxKills: 0,
      maxDeaths: 0,
      maxAssists: 0,
      maxGPM: 0,
      maxDuration: 0,
      avgKills: 0,
      avgDeaths: 0,
      avgAssists: 0,
      avgGPM: 0,
      avgDuration: 0,
    },
    totals: [],
  }

  return <HeroesSection data={data} />
}

// Streaming wrapper for RecentMatchesSection
async function RecentMatchesSectionWrapper({ steamId }: { steamId: string }) {
  const recentMatches = await getCachedPlayerRecentMatches(steamId)

  const data: WrappedData = {
    player: {} as WrappedData["player"],
    rank: undefined,
    winLoss: { win: 0, lose: 0 },
    firstMatch: undefined,
    totalMatches: 0,
    recentMatches,
    topFriends: [],
    heroes: [],
    records: {
      maxKills: 0,
      maxDeaths: 0,
      maxAssists: 0,
      maxGPM: 0,
      maxDuration: 0,
      avgKills: 0,
      avgDeaths: 0,
      avgAssists: 0,
      avgGPM: 0,
      avgDuration: 0,
    },
    totals: [],
  }

  return <RecentMatchesSection data={data} />
}

// Streaming wrapper for TotalStatsSection
async function TotalStatsSectionWrapper({ steamId }: { steamId: string }) {
  const totals = await getCachedPlayerTotals(steamId)

  const data: WrappedData = {
    player: {} as WrappedData["player"],
    rank: undefined,
    winLoss: { win: 0, lose: 0 },
    firstMatch: undefined,
    totalMatches: 0,
    recentMatches: [],
    topFriends: [],
    heroes: [],
    records: {
      maxKills: 0,
      maxDeaths: 0,
      maxAssists: 0,
      maxGPM: 0,
      maxDuration: 0,
      avgKills: 0,
      avgDeaths: 0,
      avgAssists: 0,
      avgGPM: 0,
      avgDuration: 0,
    },
    totals,
  }

  return <TotalStatsSection data={data} />
}

// Streaming wrapper for SocialSharing
async function SocialSharingWrapper({ steamId }: { steamId: string }) {
  const [player, winLoss, rank] = await Promise.all([
    getCachedPlayer(steamId),
    getCachedPlayerWinLoss(steamId),
    getCachedPlayerRank(steamId),
  ])

  const data: WrappedData = {
    player,
    rank,
    winLoss,
    firstMatch: undefined,
    totalMatches: winLoss.win + winLoss.lose,
    recentMatches: [],
    topFriends: [],
    heroes: [],
    records: {
      maxKills: 0,
      maxDeaths: 0,
      maxAssists: 0,
      maxGPM: 0,
      maxDuration: 0,
      avgKills: 0,
      avgDeaths: 0,
      avgAssists: 0,
      avgGPM: 0,
      avgDuration: 0,
    },
    totals: [],
  }

  return <SocialSharing data={data} />
}

export default async function WrappedPage({ params }: PageProps) {
  const { steamId } = await params

  return (
    <div className="m-3 flex flex-col gap-6 md:mx-6 md:mt-6 md:mb-16" id="dota-wrapped-result">
      <div className="grid grid-cols-1 gap-6 rounded-2xl md:grid-cols-2 xl:grid-cols-3">
        <div className="order-2 md:order-1">
          <Suspense fallback={<CardSkeleton height={450} />}>
            <FriendsSectionWrapper steamId={steamId} />
          </Suspense>
        </div>
        <div className="order-1 md:order-2">
          <Suspense fallback={<CardSkeleton count={3} height={200} />}>
            <PlayerOverviewWrapper steamId={steamId} />
          </Suspense>
        </div>
        <div className="order-3 md:col-span-2 xl:col-span-1">
          <Suspense fallback={<CardSkeleton height={450} />}>
            <HeroesSectionWrapper steamId={steamId} />
          </Suspense>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <Suspense fallback={<TableSkeleton rows={10} />}>
          <RecentMatchesSectionWrapper steamId={steamId} />
        </Suspense>
        <Suspense fallback={<TableSkeleton rows={20} />}>
          <TotalStatsSectionWrapper steamId={steamId} />
        </Suspense>
        <Suspense fallback={<CardSkeleton height={100} />}>
          <SocialSharingWrapper steamId={steamId} />
        </Suspense>
      </div>
    </div>
  )
}
