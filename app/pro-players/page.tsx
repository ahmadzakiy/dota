import Link from "next/link"
import { ProPlayersTable } from "@/components/pro-players-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { openDotaAPI } from "@/lib/opendota-api"
import type { ProPlayer } from "@/lib/types"

type ErrorType = "rate_limit" | "server_error" | "network_error" | "empty_data" | "unknown"

type ErrorState = {
  type: ErrorType
  message: string
  canRetry: boolean
}

function getErrorState(error: unknown): ErrorState {
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase()

    if (errorMessage.includes("rate limit")) {
      return {
        type: "rate_limit",
        message: "Rate limit exceeded. Please try again in a few minutes.",
        canRetry: true,
      }
    }

    if (
      errorMessage.includes("500") ||
      errorMessage.includes("503") ||
      errorMessage.includes("502")
    ) {
      return {
        type: "server_error",
        message: "OpenDota service is currently unavailable. Please try again later.",
        canRetry: true,
      }
    }

    if (errorMessage.includes("api error") || errorMessage.includes("fetch")) {
      return {
        type: "network_error",
        message: "Failed to load pro players. Please check your connection and try again.",
        canRetry: true,
      }
    }

    return {
      type: "unknown",
      message: error.message,
      canRetry: true,
    }
  }

  return {
    type: "unknown",
    message: "Failed to load pro players. Please try again later.",
    canRetry: true,
  }
}

export default async function ProPlayersPage() {
  let players: ProPlayer[] = []
  let errorState: ErrorState | null = null

  try {
    players = await openDotaAPI.getProPlayers()

    if (!players || players.length === 0) {
      errorState = {
        type: "empty_data",
        message: "No pro players data available at this time.",
        canRetry: true,
      }
    }
  } catch (err) {
    errorState = getErrorState(err)
  }

  if (errorState) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Pro Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center">
              <div className="rounded-full bg-destructive/10 p-3">
                <svg
                  className="size-6 text-destructive"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Error warning icon</title>
                  <path
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Unable to Load Pro Players</h3>
                <p className="max-w-md text-muted-foreground">{errorState.message}</p>
              </div>
              {errorState.canRetry && (
                <div className="flex gap-2">
                  <Link href="/pro-players">
                    <Button type="button" variant="default">
                      Retry
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button type="button" variant="outline">
                      Go Home
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto mb-20 px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Pro Players</CardTitle>
        </CardHeader>
        <CardContent>
          <ProPlayersTable players={players} />
        </CardContent>
      </Card>
    </div>
  )
}
