"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Footer } from "./footer"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"

const LOADING_MESSAGES = [
  "Connecting to the Ancient",
  "Analyzing your battlefield prowess",
  "Gathering intel from the Dire and Radiant",
  "Calculating your legendary moments",
  "Reviewing your heroic achievements",
  "Examining your alliance bonds",
  "Compiling your goblin's journey",
]

const MESSAGE_INTERVAL_MS = 2000
const PROGRESS_INTERVAL_MS = 500
const MAX_PROGRESS_THRESHOLD = 95
const PROGRESS_INCREMENT_MULTIPLIER = 15
const MAX_PROGRESS = 100
const ANIMATION_DELAY_MULTIPLIER = 0.3

export function LoadingScreen() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, MESSAGE_INTERVAL_MS)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= MAX_PROGRESS_THRESHOLD) {
          return prev
        }
        return prev + Math.random() * PROGRESS_INCREMENT_MULTIPLIER
      })
    }, PROGRESS_INTERVAL_MS)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [])

  const handleBack = () => {
    router.back()
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
      <Card className="relative z-1 w-full max-w-sm bg-background/60 text-center shadow-2xl backdrop-blur-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl">Dota Wrapped</h1>
          </CardTitle>
          <CardDescription>
            <div className="flex items-baseline justify-center gap-1">
              <p>{LOADING_MESSAGES[currentMessage]}</p>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    className="h-1 w-1 animate-pulse rounded-full bg-white"
                    key={i}
                    style={{ animationDelay: `${i * ANIMATION_DELAY_MULTIPLIER}s` }}
                  />
                ))}
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="my-2.5 flex flex-col items-center justify-center gap-2">
            <Progress className="w-60 bg-white" value={Math.min(progress, MAX_PROGRESS)} />
            <p className="text-caption">{Math.round(Math.min(progress, MAX_PROGRESS))}% Complete</p>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button className="w-full" onClick={handleBack} variant="outline">
            Back to home
          </Button>
        </CardFooter>
      </Card>
      <Footer />
    </div>
  )
}
