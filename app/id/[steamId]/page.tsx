import { Suspense } from "react"
import { FriendsSection } from "@/components/friends-section"
import { HeroesSection } from "@/components/heroes-section"
import { CardSkeleton, TableSkeleton } from "@/components/loading-skeletons"
import { PlayerOverview } from "@/components/player-overview"
import { RecentMatchesSection } from "@/components/recent-matches-section"
import { SocialSharing } from "@/components/social-sharing"
import { TotalStatsSection } from "@/components/total-stats-section"
import {
  getCachedRecentMatchesData,
  getCachedStableProfileData,
} from "@/lib/opendota-api"
import type { RecentMatchesData, StableProfileData, WrappedData } from "@/lib/types"

type PageProps = {
  params: Promise<{ steamId: string }>
}

function createWrappedData(
  stableData: StableProfileData,
  recentMatchesData?: RecentMatchesData,
): WrappedData {
  return {
    ...stableData,
    recentMatches: recentMatchesData?.recentMatches ?? [],
  }
}

async function StableProfileSections({
  stableDataPromise,
}: {
  stableDataPromise: Promise<StableProfileData>
}) {
  const stableData = await stableDataPromise
  const data = createWrappedData(stableData)

  return (
    <>
      <div className="grid grid-cols-1 gap-6 rounded-2xl md:grid-cols-2 xl:grid-cols-3">
        <div className="order-2 md:order-1">
          <FriendsSection data={data} />
        </div>
        <div className="order-1 md:order-2">
          <PlayerOverview data={data} />
        </div>
        <div className="order-3 md:col-span-2 xl:col-span-1">
          <HeroesSection data={data} />
        </div>
      </div>

      <Suspense fallback={<TableSkeleton rows={20} />}>
        <TotalStatsSectionWrapper stableDataPromise={stableDataPromise} />
      </Suspense>
    </>
  )
}

async function RecentMatchesSectionWrapper({
  stableDataPromise,
  recentMatchesDataPromise,
}: {
  stableDataPromise: Promise<StableProfileData>
  recentMatchesDataPromise: Promise<RecentMatchesData>
}) {
  const [stableData, recentMatchesData] = await Promise.all([
    stableDataPromise,
    recentMatchesDataPromise,
  ])

  return <RecentMatchesSection data={createWrappedData(stableData, recentMatchesData)} />
}

async function TotalStatsSectionWrapper({
  stableDataPromise,
}: {
  stableDataPromise: Promise<StableProfileData>
}) {
  const stableData = await stableDataPromise

  return <TotalStatsSection data={createWrappedData(stableData)} />
}

async function SocialSharingWrapper({
  stableDataPromise,
}: {
  stableDataPromise: Promise<StableProfileData>
}) {
  const stableData = await stableDataPromise

  return <SocialSharing data={createWrappedData(stableData)} />
}

export default async function WrappedPage({ params }: PageProps) {
  const { steamId } = await params

  const stableDataPromise = getCachedStableProfileData(steamId)
  const recentMatchesDataPromise = getCachedRecentMatchesData(steamId)

  return (
    <div className="m-3 flex flex-col gap-6 md:mx-6 md:mt-6 md:mb-16" id="dota-wrapped-result">
      <Suspense fallback={<CardSkeleton count={3} height={450} />}>
        <StableProfileSections stableDataPromise={stableDataPromise} />
      </Suspense>

      <div className="flex flex-col gap-6">
        <Suspense fallback={<TableSkeleton rows={10} />}>
          <RecentMatchesSectionWrapper
            recentMatchesDataPromise={recentMatchesDataPromise}
            stableDataPromise={stableDataPromise}
          />
        </Suspense>

        <Suspense fallback={<CardSkeleton height={100} />}>
          <SocialSharingWrapper stableDataPromise={stableDataPromise} />
        </Suspense>
      </div>
    </div>
  )
}
