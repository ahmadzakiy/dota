"use client"

import Link from "next/link"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // biome-ignore lint/suspicious/noConsole: Error logging is necessary for debugging
    console.error("Player page error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="relative z-1 w-full max-w-sm bg-background/60 text-center shadow-2xl backdrop-blur-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl">Something went wrong</h1>
          </CardTitle>
          <CardDescription>
            {error.message || "Unable to load player data. Please try again."}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <Button className="w-full" onClick={reset} variant="default">
            Try Again
          </Button>
          <Link className="w-full" href="/">
            <Button className="w-full" variant="outline">
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
