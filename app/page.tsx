"use client"

import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { toast } from "sonner"
import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { openDotaAPI } from "@/lib/opendota-api"

export default function HomePage() {
  const [steamId, setSteamId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!steamId.trim()) {
      return
    }

    setIsLoading(true)

    try {
      const isValid = await openDotaAPI.validateAccount(steamId.trim())
      if (!isValid) {
        toast.error(
          "Account not found, please check your Steam ID and make sure your profile is public.",
        )
        setIsLoading(false)
        return
      }

      router.push(`/${steamId.trim()}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <BubbleBackground
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-black"
        colors={{
          first: "192, 46, 26",
          second: "192, 46, 26",
          third: "192, 46, 26",
          fourth: "192, 46, 26",
          fifth: "255, 255, 255",
          sixth: "192, 46, 26",
        }}
        interactive={true}
      />
      {/* Main Form Card */}
      <Card className="relative z-1 w-full max-w-sm bg-background/60 text-center shadow-2xl backdrop-blur-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl">Dota Wrapped</h1>
          </CardTitle>
          <CardDescription>Discover how badly you defended the ancient.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="steamId">Steam ID</Label>
              <Input
                disabled={isLoading}
                id="steamId"
                onChange={(e) => setSteamId(e.target.value)}
                placeholder="156606112"
                required
                type="text"
                value={steamId}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            className="w-full"
            disabled={!steamId.trim() || isLoading}
            onClick={handleSubmit}
            type="submit"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                <span>Checking the account...</span>
              </div>
            ) : (
              "Generate my wrapped"
            )}
          </Button>
        </CardFooter>
      </Card>
      <Footer />
    </div>
  )
}
