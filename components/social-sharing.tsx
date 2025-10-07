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
    const firstMatchDate = data.firstMatch?.start_time
      ? formatDate(data.firstMatch.start_time)
      : "Unknown"
    const kills = getTotalValue(data.totals, "kills")
    const deaths = getTotalValue(data.totals, "deaths")
    const assists = getTotalValue(data.totals, "assists")
    const wrappedUrl = window?.location?.href

    return `🐸 My Dota Wrapped!

  👤 ${playerName}
  📅 Playing Dota since ${firstMatchDate}
  🏆 ${winRate}% Win Rate (${data.totalMatches} matches)
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

  const handleInstagramShare = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), COPY_FEEDBACK_TIMEOUT)
      window.open("https://www.instagram.com/", "_blank")
    })
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), COPY_FEEDBACK_TIMEOUT)
    })
  }

  return (
    <BackgroundGradient>
      <Card className="relative rounded-[20px] bg-card/80">
        <CardHeader>
          <CardTitle>Share Your Dota Wrapped</CardTitle>
          <CardDescription>
            Brag about your feeding skills and convince your friends they're worse than you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Preview Text */}
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="whitespace-pre-line font-mono text-sm">{shareText}</div>
            </div>

            {/* Share Buttons */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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

              <Button
                className="flex items-center gap-2"
                onClick={handleInstagramShare}
                variant="secondary"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <title>Share on Instagram</title>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
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
