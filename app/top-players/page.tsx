import { User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getRankName, openDotaAPI } from "@/lib/opendota-api"
import type { TopPlayer } from "@/lib/types"

type ErrorType = "rate_limit" | "server_error" | "network_error" | "empty_data" | "unknown"

type ErrorState = {
  type: ErrorType
  message: string
  canRetry: boolean
}

function getErrorState(error: unknown): ErrorState {
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase()

    // Check for rate limiting (429 errors)
    if (errorMessage.includes("rate limit")) {
      return {
        type: "rate_limit",
        message: "Rate limit exceeded. Please try again in a few minutes.",
        canRetry: true,
      }
    }

    // Check for service unavailable (5xx errors)
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

    // Network or other API errors
    if (errorMessage.includes("api error") || errorMessage.includes("fetch")) {
      return {
        type: "network_error",
        message: "Failed to load top players. Please check your connection and try again.",
        canRetry: true,
      }
    }

    // Generic error with the original message
    return {
      type: "unknown",
      message: error.message,
      canRetry: true,
    }
  }

  // Unknown error type
  return {
    type: "unknown",
    message: "Failed to load top players. Please try again later.",
    canRetry: true,
  }
}

export default async function TopPlayersPage() {
  let players: TopPlayer[] = []
  let errorState: ErrorState | null = null

  try {
    players = await openDotaAPI.getTopPlayers()

    // Handle empty response scenario
    if (!players || players.length === 0) {
      errorState = {
        type: "empty_data",
        message: "No top players data available at this time.",
        canRetry: true,
      }
    }
  } catch (err) {
    // Handle API failures with appropriate error messages
    errorState = getErrorState(err)
  }

  // Render error state UI
  if (errorState) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Players</CardTitle>
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
                <h3 className="font-semibold text-lg">Unable to Load Top Players</h3>
                <p className="max-w-md text-muted-foreground">{errorState.message}</p>
              </div>
              {errorState.canRetry && (
                <div className="flex gap-2">
                  <Link href="/top-players">
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
          <div className="flex items-center justify-between">
            <CardTitle>Top Players</CardTitle>
            <Badge variant="secondary">{players.length} Players</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>List of the top {players.length} ranked Dota 2 players</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16" scope="col">
                  #
                </TableHead>
                <TableHead scope="col">Avatar</TableHead>
                <TableHead scope="col">Name</TableHead>
                <TableHead scope="col">Country</TableHead>
                <TableHead scope="col">Rank</TableHead>
                <TableHead scope="col">Team</TableHead>
                <TableHead scope="col">Pro</TableHead>
                <TableHead className="text-right" scope="col">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player, index) => {
                const displayName = player.name || player.personaname || "Unknown Player"
                const rank = index + 1
                const countryFlag = player.loccountrycode
                  ? `https://flagcdn.com/16x12/${player.loccountrycode.toLowerCase()}.png`
                  : null
                const rankName = getRankName(player.rank_tier)

                return (
                  <TableRow key={player.account_id}>
                    <TableCell className="font-medium">{rank}</TableCell>
                    <TableCell>
                      {player.avatar ? (
                        <Image
                          alt={`${displayName} avatar`}
                          className="rounded-full"
                          height={32}
                          src={player.avatar}
                          width={32}
                        />
                      ) : (
                        <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                          <User className="size-4 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{displayName}</TableCell>
                    <TableCell>
                      {countryFlag && player.loccountrycode ? (
                        <div className="flex items-center gap-2">
                          <Image
                            alt={`${player.loccountrycode} flag`}
                            height={12}
                            src={countryFlag}
                            width={16}
                          />
                          <span className="text-sm">{player.loccountrycode}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{rankName}</span>
                    </TableCell>
                    <TableCell>
                      {player.team_name ? (
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{player.team_name}</span>
                          {player.team_tag && (
                            <span className="text-muted-foreground text-xs">
                              [{player.team_tag}]
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {player.is_pro ? (
                        <Badge className="text-xs" variant="default">
                          Pro
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        aria-label={`View profile for ${displayName}`}
                        href={`/id/${player.account_id}`}
                      >
                        <Button size="sm">View Profile</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
