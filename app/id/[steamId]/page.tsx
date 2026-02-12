import { FriendsSection } from "@/components/friends-section"
import { HeroesSection } from "@/components/heroes-section"
import { PlayerOverview } from "@/components/player-overview"
import { RecentMatchesSection } from "@/components/recent-matches-section"
import { SocialSharing } from "@/components/social-sharing"
import { TotalStatsSection } from "@/components/total-stats-section"
import { getCachedPlayerWrappedData } from "@/lib/opendota-api"

type PageProps = {
  params: Promise<{ steamId: string }>
}

// Cache this page for 1 hour (3600 seconds)
export const revalidate = 3600


export default async function WrappedPage({ params }: PageProps) {
  const { steamId } = await params
  const wrappedData = await getCachedPlayerWrappedData(steamId)

  return (
    <div className="m-3 flex flex-col gap-6 md:mx-6 md:mt-6 md:mb-16" id="dota-wrapped-result">
      <div className="grid grid-cols-1 gap-6 rounded-2xl md:grid-cols-2 xl:grid-cols-3">
        <div className="order-2 md:order-1">
          <FriendsSection data={wrappedData} />
        </div>
        <div className="order-1 md:order-2">
          <PlayerOverview data={wrappedData} />
        </div>
        <div className="order-3 md:col-span-2 xl:col-span-1">
          <HeroesSection data={wrappedData} />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <RecentMatchesSection data={wrappedData} />
        <TotalStatsSection data={wrappedData} />
        <SocialSharing data={wrappedData} />
      </div>
    </div>
  )
}
