"use client"
import { useState } from "react"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/opendota-api"
import type { WrappedData } from "@/lib/types"

const PERCENTAGE_MULTIPLIER = 100
const COPY_FEEDBACK_TIMEOUT = 2000

type SocialSharingProps = {
  data: WrappedData
}

// Helper function to extract totals from PlayerTotals array
const getTotalValue = (totals: { field: string; sum: number }[], field: string): number => {
  const total = totals.find((item) => item.field === field)
  return total ? total.sum : 0
}

export function SocialSharing({ data }: SocialSharingProps) {
  const [copied, setCopied] = useState(false)

  const generateShareText = () => {
    const winRate =
      data.totalMatches > 0
        ? ((data.winLoss.win / data.totalMatches) * PERCENTAGE_MULTIPLIER).toFixed(1)
        : "0.0"

    const playerName = data.player?.profile?.personaname || "Anonymous Hero"
    const firstMatchLine = data.firstMatch?.start_time
      ? `📅 Playing Dota since ${formatDate(data.firstMatch.start_time)}\n`
      : ""
    const kills = getTotalValue(data.totals, "kills")
    const deaths = getTotalValue(data.totals, "deaths")
    const assists = getTotalValue(data.totals, "assists")
    const wrappedUrl =
      typeof window !== "undefined" ? window.location.href : "https://dotawrapped.com"

    return `🐸 My Dota Wrapped!

👤 ${playerName}
${firstMatchLine}🏆 ${winRate}% Win Rate (${data.totalMatches} matches)
🗡️ K/D/A: ${kills}/${deaths}/${assists}

Check your own Dota Wrapped at: ${wrappedUrl}

#DotaWrapped #Dota2 #Gaben #Icefrog`
  }

  const shareText = generateShareText()
  const encodedText = encodeURIComponent(shareText)

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`
    window.open(twitterUrl, "_blank", "width=550,height=420")
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), COPY_FEEDBACK_TIMEOUT)
    })
  }

  return (
    <BackgroundGradient>
      <Card className="relative rounded-[20px] bg-card">
        <CardHeader>
          <CardTitle>Share Your Dota Wrapped</CardTitle>
          <CardDescription>
            Brag about your feeding skills and convince your friends they're worse than you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Preview Text */}
            <div className="overflow-scroll rounded-lg border bg-muted/30 p-4">
              <div className="whitespace-pre-line font-mono text-sm">{shareText}</div>
            </div>

            {/* Share Buttons */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button
                className="flex items-center gap-2"
                onClick={handleTwitterShare}
                variant="secondary"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <title>Share on Twitter/X</title>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Share on X
              </Button>

              <Button onClick={handleCopyToClipboard} variant="outline">
                {copied ? (
                  <>
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <title>Copied confirmation</title>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <title>Copy to clipboard</title>
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                    </svg>
                    Copy Text
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </BackgroundGradient>
  )
}
