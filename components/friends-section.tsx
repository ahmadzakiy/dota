"use client"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { WrappedData } from "@/lib/types"

const PERCENTAGE_MULTIPLIER = 100

type FriendsSectionProps = {
  data: WrappedData
}

export function FriendsSection({ data }: FriendsSectionProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="font-semibold text-2xl">Friends</CardTitle>
        <CardDescription>Your allies and professional feeders</CardDescription>
      </CardHeader>
      <CardContent>
        {data.topFriends && data.topFriends.length > 0 ? (
          <ScrollArea className="h-[446px] w-full space-y-4">
            <div className="space-y-4">
              {data.topFriends.slice(0, 10).map((friend, index) => {
                const friendWinRate =
                  friend.with_games > 0
                    ? ((friend.with_win / friend.with_games) * PERCENTAGE_MULTIPLIER).toFixed(1)
                    : "0.0"
                const gamesWithFriend = friend.with_games
                const winsWithFriend = friend.with_win
                const lossesWithFriend = friend.with_games - friend.with_win

                return (
                  <Link className="block" href={`/id/${friend.account_id}`} key={friend.account_id}>
                    <div
                      className="flex cursor-pointer items-start space-x-3 rounded-lg border border-border/50 bg-muted/50 p-3 transition-colors hover:bg-muted/80"
                      id="friend-card"
                    >
                      <Image
                        alt={friend.personaname || "Anonymous"}
                        className="mt-1 h-8 w-8 rounded-full border border-border object-cover"
                        height={24}
                        src={friend.avatarfull || "/placeholder-user.jpg"}
                        width={24}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between">
                          <h4 className="truncate font-semibold text-sm">{friend.personaname}</h4>
                          <Badge className="font-mono text-xs tabular-nums" variant="outline">
                            #{index + 1}
                          </Badge>
                        </div>
                        <div className="mt-1 text-muted-foreground text-xs">
                          <div className="flex justify-between">
                            <span className="text-foreground">
                              {gamesWithFriend} matches together
                            </span>
                          </div>
                          <div className="mt-1 flex justify-between">
                            <span>
                              <span>{winsWithFriend} wins</span> &{" "}
                              <span>{lossesWithFriend} losses</span>
                            </span>
                            <span
                              className={`font-mono text-sm ${
                                Number(friendWinRate) > 50
                                  ? "text-green-500 dark:text-green-400"
                                  : "text-red-500 dark:text-red-400"
                              }`}
                            >
                              {friendWinRate}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </ScrollArea>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <span className="text-xl">🤝</span>
            </div>
            <h3 className="mb-2 font-semibold text-lg">No Battle Companions</h3>
            <p className="text-muted-foreground text-sm">Looks like you've been fighting solo!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
