"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { toast } from "sonner"
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
import { GradientAnimation } from "@/components/ui/gradient-animation"
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

      router.push(`/id/${steamId.trim()}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <GradientAnimation
        containerClassName="absolute inset-0"
        fifthColor="192, 46, 26"
        firstColor="192, 46, 26"
        fourthColor="192, 46, 26"
        gradientBackgroundEnd="rgb(0, 0, 0)"
        gradientBackgroundStart="rgb(15, 23, 42)"
        interactive={false}
        secondColor="192, 46, 26"
        thirdColor="255, 255, 255"
      />

      {/* Main Form Card */}
      <Card className="relative z-1 w-full max-w-[360px] bg-background/80 text-center shadow-2xl backdrop-blur-md sm:max-w-sm">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl">Dota Wrapped</h1>
          </CardTitle>
          <CardDescription>Discover how badly you defended the ancient.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="steamId">Steam ID, ex: 156606112</Label>
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
          <Link className="w-full" href={"/pro-players"}>
            <Button className="w-full" variant="ghost">
              Check pro players profile
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <Footer />
    </div>
  )
}
