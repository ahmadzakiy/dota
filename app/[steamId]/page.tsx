"use client"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { FriendsSection } from "@/components/friends-section"
import { HeroesSection } from "@/components/heroes-section"
import { LoadingScreen } from "@/components/loading-screen"
import { PlayerOverview } from "@/components/player-overview"
import { RecentMatchesSection } from "@/components/recent-matches-section"
import { SocialSharing } from "@/components/social-sharing"
import { TotalStatsSection } from "@/components/total-stats-section"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { openDotaAPI } from "@/lib/opendota-api"
// import DummyData from "@/lib/data.json" with { type: "json" }
import type { WrappedData } from "@/lib/types"

export default function WrappedPage() {
  const [wrappedData, setWrappedData] = useState<WrappedData | null>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useParams()
  const steamId = params.steamId as string

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const data = await openDotaAPI.getPlayerWrappedData(steamId)

        // biome-ignore lint/suspicious/noConsole: <log data for debugging>
        console.log("WRAPPED DATA", data)
        setWrappedData(data)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (steamId) {
      fetchData()
    }
  }, [steamId])

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return <LoadingScreen />
  }

  if (!wrappedData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="relative z-1 w-full max-w-sm bg-background/60 text-center shadow-2xl backdrop-blur-md">
          <CardHeader>
            <CardTitle>
              <h1 className="text-3xl">Data not found</h1>
            </CardTitle>
            <CardDescription>Unable to load your Dota statistics</CardDescription>
          </CardHeader>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full" onClick={handleBack} variant="outline">
              Back to home
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="m-3 flex flex-col gap-6 bg-background md:m-6" id="dota-wrapped-result">
      <div className="grid grid-cols-1 gap-4 rounded-2xl md:grid-cols-2 md:gap-6 xl:grid-cols-3">
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

      <div className="flex flex-col gap-4 md:gap-6">
        <RecentMatchesSection data={wrappedData} />
        <TotalStatsSection data={wrappedData} />
        <SocialSharing data={wrappedData} />
      </div>
    </div>
  )
}
