"use client"

import { User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { memo, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
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
const DEBOUNCE_DELAY_MS = 300
const PAGINATION_ELLIPSIS_THRESHOLD = 3

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

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Memoized table row component to prevent unnecessary re-renders
const PlayerTableRow = memo(({ player, index }: { player: ProPlayer; index: number }) => {
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
            loading="lazy"
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
              loading="lazy"
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
              <span className="text-muted-foreground text-xs">[{player.team_tag}]</span>
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
        <Link aria-label={`View profile for ${displayName}`} href={`/id/${player.account_id}`}>
          <Button size="sm" variant="link">
            View Profile
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  )
})

PlayerTableRow.displayName = "PlayerTableRow"

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Multiple sortable columns require this complexity
export function ProPlayersTable({ players }: ProPlayersTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<SortColumn>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)

  const ITEMS_PER_PAGE = 50

  // Debounce search term to reduce filtering operations while typing
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY_MS)

  // Defer the search term to prevent blocking the input
  const deferredSearchTerm = useDeferredValue(debouncedSearchTerm)

  // Track previous values to detect changes
  const prevFiltersRef = useRef({
    search: deferredSearchTerm,
    column: sortColumn,
    order: sortOrder,
  })

  // Memoize the filtered and sorted results
  const filteredPlayers = useMemo(
    () => filterAndSortPlayers(players, deferredSearchTerm, sortColumn, sortOrder),
    [players, deferredSearchTerm, sortColumn, sortOrder],
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedPlayers = useMemo(
    () => filteredPlayers.slice(startIndex, endIndex),
    [filteredPlayers, startIndex, endIndex],
  )

  // Reset to page 1 when search/sort changes
  useEffect(() => {
    const prev = prevFiltersRef.current
    if (
      prev.search !== deferredSearchTerm ||
      prev.column !== sortColumn ||
      prev.order !== sortOrder
    ) {
      setCurrentPage(1)
      prevFiltersRef.current = { search: deferredSearchTerm, column: sortColumn, order: sortOrder }
    }
  }, [deferredSearchTerm, sortColumn, sortOrder])

  const handleSort = useCallback(
    (column: SortColumn) => {
      setSortColumn((prevColumn) => {
        const newOrder = prevColumn === column && sortOrder === "desc" ? "asc" : "desc"
        setSortOrder(newOrder)
        return column
      })
    },
    [sortOrder],
  )

  const isSearching = searchTerm !== debouncedSearchTerm

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
        <div className="space-y-4">
          <div className="rounded-md border">
            <Table>
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
                {paginatedPlayers.map((player, index) => (
                  <PlayerTableRow
                    index={startIndex + index}
                    key={player.account_id}
                    player={player}
                  />
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={
                        currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                      }
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    />
                  </PaginationItem>

                  {/* First page */}
                  {currentPage > 2 && (
                    <PaginationItem>
                      <PaginationLink className="cursor-pointer" onClick={() => setCurrentPage(1)}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Ellipsis before current page */}
                  {currentPage > PAGINATION_ELLIPSIS_THRESHOLD && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {/* Previous page */}
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        className="cursor-pointer"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        {currentPage - 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Current page */}
                  <PaginationItem>
                    <PaginationLink isActive>{currentPage}</PaginationLink>
                  </PaginationItem>

                  {/* Next page */}
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationLink
                        className="cursor-pointer"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        {currentPage + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Ellipsis after current page */}
                  {currentPage < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {/* Last page */}
                  {currentPage < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationLink
                        className="cursor-pointer"
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
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
