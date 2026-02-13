"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { GradientAnimation } from "@/components/dynamic-imports"
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
const MAX_PROGRESS_THRESHOLD = 90
const PROGRESS_INCREMENT_MIN = 3
const PROGRESS_INCREMENT_MAX = 8
const MAX_PROGRESS = 100
const ANIMATION_DELAY_MULTIPLIER = 0.3

export function LoadingScreen() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(10)
  const progressRef = useRef(10)
  const router = useRouter()

  useEffect(() => {
    // Single interval for both message rotation and progress updates
    // Reduced from 2 separate intervals to 1
    const interval = setInterval(() => {
      // Update message every 2 seconds
      setCurrentMessage((prev) => (prev + 1) % LOADING_MESSAGES.length)

      // Update progress gradually
      if (progressRef.current < MAX_PROGRESS_THRESHOLD) {
        const increment =
          PROGRESS_INCREMENT_MIN + Math.random() * (PROGRESS_INCREMENT_MAX - PROGRESS_INCREMENT_MIN)
        progressRef.current = Math.min(progressRef.current + increment, MAX_PROGRESS_THRESHOLD)
        setProgress(progressRef.current)
      }
    }, MESSAGE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const handleBack = () => {
    router.back()
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
      <Card className="relative z-1 w-full max-w-[360px] bg-background/60 text-center shadow-2xl backdrop-blur-md sm:max-w-sm">
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
