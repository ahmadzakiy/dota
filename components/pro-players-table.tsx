"use client"

import { User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useDeferredValue, useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { ProPlayer } from "@/lib/types"

type SortColumn = "name" | "country" | "team" | "role" | "last_match"

type ProPlayersTableProps = {
  players: ProPlayer[]
}

const ROLE_NAMES: Record<number, string> = {
  1: "Core",
  2: "Support",
}

const MS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60
const HOURS_PER_DAY = 24
const MS_PER_DAY = MS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY
const DAYS_PER_WEEK = 7
const DAYS_PER_MONTH = 30
const DAYS_PER_YEAR = 365

function getDaysDifference(lastMatchTime: string): number {
  const matchDate = new Date(lastMatchTime)
  const now = new Date()
  const diffMs = now.getTime() - matchDate.getTime()
  return Math.floor(diffMs / MS_PER_DAY)
}

function getTimeLabel(diffDays: number): string {
  if (diffDays === 0) {
    return "Today"
  }
  if (diffDays === 1) {
    return "Yesterday"
  }
  if (diffDays < DAYS_PER_WEEK) {
    return `${diffDays}d ago`
  }
  if (diffDays < DAYS_PER_MONTH) {
    return `${Math.floor(diffDays / DAYS_PER_WEEK)}w ago`
  }
  if (diffDays < DAYS_PER_YEAR) {
    return `${Math.floor(diffDays / DAYS_PER_MONTH)}mo ago`
  }
  return `${Math.floor(diffDays / DAYS_PER_YEAR)}y ago`
}

function formatLastMatch(lastMatchTime: string | null): string {
  if (!lastMatchTime) {
    return "-"
  }

  const diffDays = getDaysDifference(lastMatchTime)
  return getTimeLabel(diffDays)
}

function getPlayerName(player: ProPlayer): string {
  return player.name || player.personaname || "Unknown Player"
}

function getLastMatchTimestamp(player: ProPlayer): number {
  return player.last_match_time ? new Date(player.last_match_time).getTime() : 0
}

function getSortValue(player: ProPlayer, column: SortColumn): string | number {
  const sortValues = {
    name: getPlayerName(player),
    country: player.loccountrycode || "",
    team: player.team_name || "",
    role: player.fantasy_role || 0,
    last_match: getLastMatchTimestamp(player),
  }
  return sortValues[column] || ""
}

function compareValues(
  aValue: string | number,
  bValue: string | number,
  sortOrder: "asc" | "desc",
): number {
  if (typeof aValue === "string" && typeof bValue === "string") {
    return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
  }

  return sortOrder === "asc"
    ? (aValue as number) - (bValue as number)
    : (bValue as number) - (aValue as number)
}

function matchesSearch(player: ProPlayer, searchLower: string): boolean {
  const displayName = player.name || player.personaname || ""
  const teamName = player.team_name || ""
  const country = player.loccountrycode || ""

  return (
    displayName.toLowerCase().includes(searchLower) ||
    teamName.toLowerCase().includes(searchLower) ||
    country.toLowerCase().includes(searchLower)
  )
}

function filterAndSortPlayers(
  playersList: ProPlayer[],
  searchTerm: string,
  sortColumn: SortColumn,
  sortOrder: "asc" | "desc",
): ProPlayer[] {
  const trimmedSearch = searchTerm.trim()
  const filtered = trimmedSearch
    ? playersList.filter((player) => matchesSearch(player, trimmedSearch.toLowerCase()))
    : playersList

  return [...filtered].sort((a, b) => {
    const aValue = getSortValue(a, sortColumn)
    const bValue = getSortValue(b, sortColumn)
    return compareValues(aValue, bValue, sortOrder)
  })
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Multiple sortable columns require this complexity
export function ProPlayersTable({ players }: ProPlayersTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<SortColumn>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // Defer the search term to prevent blocking the input
  const deferredSearchTerm = useDeferredValue(searchTerm)

  // Memoize the filtered and sorted results
  const filteredPlayers = useMemo(
    () => filterAndSortPlayers(players, deferredSearchTerm, sortColumn, sortOrder),
    [players, deferredSearchTerm, sortColumn, sortOrder],
  )

  const handleSort = (column: SortColumn) => {
    const newOrder = sortColumn === column && sortOrder === "desc" ? "asc" : "desc"
    setSortColumn(column)
    setSortOrder(newOrder)
  }

  const isSearching = searchTerm !== deferredSearchTerm

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="relative max-w-sm flex-1">
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, team, or country..."
            value={searchTerm}
          />
          {isSearching && (
            <div className="-translate-y-1/2 absolute top-1/2 right-3">
              <div className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}
        </div>
        <Badge variant="secondary">{filteredPlayers.length} Players</Badge>
      </div>

      {filteredPlayers.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableCaption>
              List of {filteredPlayers.length} professional Dota 2 players
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16" scope="col">
                  #
                </TableHead>
                <TableHead scope="col">Avatar</TableHead>
                <TableHead scope="col">
                  <button
                    className="cursor-pointer text-left font-medium hover:text-foreground"
                    onClick={() => handleSort("name")}
                    type="button"
                  >
                    Name {sortColumn === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </button>
                </TableHead>
                <TableHead scope="col">
                  <button
                    className="cursor-pointer text-left font-medium hover:text-foreground"
                    onClick={() => handleSort("country")}
                    type="button"
                  >
                    Country {sortColumn === "country" && (sortOrder === "asc" ? "↑" : "↓")}
                  </button>
                </TableHead>
                <TableHead scope="col">
                  <button
                    className="cursor-pointer text-left font-medium hover:text-foreground"
                    onClick={() => handleSort("team")}
                    type="button"
                  >
                    Team {sortColumn === "team" && (sortOrder === "asc" ? "↑" : "↓")}
                  </button>
                </TableHead>
                <TableHead scope="col">
                  <button
                    className="cursor-pointer text-left font-medium hover:text-foreground"
                    onClick={() => handleSort("role")}
                    type="button"
                  >
                    Role {sortColumn === "role" && (sortOrder === "asc" ? "↑" : "↓")}
                  </button>
                </TableHead>
                <TableHead scope="col">
                  <button
                    className="cursor-pointer text-left font-medium hover:text-foreground"
                    onClick={() => handleSort("last_match")}
                    type="button"
                  >
                    Last Match {sortColumn === "last_match" && (sortOrder === "asc" ? "↑" : "↓")}
                  </button>
                </TableHead>
                <TableHead className="text-right" scope="col">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Table row rendering requires conditional logic for all columns */}
              {filteredPlayers.map((player, index) => {
                const displayName = player.name || player.personaname || "Unknown Player"
                const rank = index + 1
                const countryFlag = player.loccountrycode
                  ? `https://flagcdn.com/16x12/${player.loccountrycode.toLowerCase()}.png`
                  : null
                const roleName = player.fantasy_role ? ROLE_NAMES[player.fantasy_role] || "-" : "-"

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
                      <span className="text-sm">{roleName}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground text-sm">
                        {formatLastMatch(player.last_match_time)}
                      </span>
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
        </div>
      ) : (
        <div className="py-8 text-center">
          <h3 className="mb-2 font-semibold text-lg">No Players Found</h3>
          <p className="text-muted-foreground text-sm">
            Try adjusting your search or clear the search box
          </p>
        </div>
      )}
    </div>
  )
}
