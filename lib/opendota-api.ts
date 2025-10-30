import { cache } from "react"
import {
  getHeroAvatar as getHeroAvatarFromHeroes,
  getHeroName as getHeroNameFromHeroes,
} from "./heroes"
import type {
  HeroStats,
  Match,
  Peer,
  Player,
  PlayerRank,
  ProPlayer,
  TopPlayer,
  WinLoss,
  WrappedData,
} from "./types"

// Additional type definitions for API responses
type PlayerTotal = {
  field: string
  n: number
  sum: number
}

const OPENDOTA_BASE_URL = "https://api.opendota.com/api"
const HTTP_NOT_FOUND = 404
const HTTP_TOO_MANY_REQUESTS = 429
const API_DELAY_MS = 50 // Reduced from 200ms to 50ms for faster loading
const RETRY_BASE_DELAY_MS = 1000
const REFINED_OFFSET_ADDITION = 1000

// Search offsets for finding oldest match
const LARGE_OFFSET = 50_000
const MEDIUM_LARGE_OFFSET = 20_000
const MEDIUM_OFFSET = 10_000
const SMALL_MEDIUM_OFFSET = 5000
const SMALL_OFFSET = 2000
const TINY_OFFSET = 1000
const MINIMAL_OFFSET = 500
const FINAL_OFFSET = 100
const MATCH_SEARCH_OFFSETS = [
  LARGE_OFFSET,
  MEDIUM_LARGE_OFFSET,
  MEDIUM_OFFSET,
  SMALL_MEDIUM_OFFSET,
  SMALL_OFFSET,
  TINY_OFFSET,
  MINIMAL_OFFSET,
  FINAL_OFFSET,
]

// Match limits
const MATCH_LIMIT_SINGLE = 1
const MATCH_LIMIT_BATCH = 100
const MATCH_LIMIT_REFINED = 200
const MATCH_LIMIT_RECENT = 100
const MATCH_LIMIT_TOP_FRIENDS = 3
const MATCH_LIMIT_DISPLAY = 5

// Time conversion
const MILLISECONDS_PER_SECOND = 1000

// Dota player slot constants
const RADIANT_PLAYER_SLOT_THRESHOLD = 128

export class OpenDotaAPI {
  private convertSteamIdToAccountId(steamId: string): string {
    const steamIdNum = BigInt(steamId)
    const STEAM_ID_BASE = BigInt("76561197960265728")

    // If it's already an account ID (shorter number), return as is
    if (steamId.length <= 10) {
      return steamId
    }

    // Convert Steam ID to Account ID
    const accountId = steamIdNum - STEAM_ID_BASE
    return accountId.toString()
  }

  private async fetchWithRetry<T = unknown>(url: string, retries = 3): Promise<T> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url)

        if (!response.ok) {
          if (response.status === HTTP_NOT_FOUND) {
            throw new Error(`Player not found. This could mean:
            1. The account ID doesn't exist in OpenDota's database
            2. The player has never played Dota
            3. The profile is private or hasn't been tracked by OpenDota
            
            Try visiting https://www.opendota.com/players/${url.split("/").pop()} to see if the profile exists.`)
          }
          if (response.status === HTTP_TOO_MANY_REQUESTS) {
            throw new Error("Rate limit exceeded. Please try again in a few minutes.")
          }
          throw new Error(`API error: ${response.status} - ${response.statusText}`)
        }

        const data = await response.json()

        await new Promise((resolve) => setTimeout(resolve, API_DELAY_MS))

        return data
      } catch (error) {
        if (i === retries - 1) {
          throw error
        }
        await new Promise((resolve) => setTimeout(resolve, RETRY_BASE_DELAY_MS * (i + 1)))
      }
    }
    throw new Error("Maximum retries exceeded")
  }

  async validateAccount(steamId: string): Promise<boolean> {
    try {
      const accountId = this.convertSteamIdToAccountId(steamId)
      const url = `${OPENDOTA_BASE_URL}/players/${accountId}`
      const response = await fetch(url)
      return response.ok
    } catch {
      return false
    }
  }

  getPlayer(steamId: string): Promise<Player> {
    const accountId = this.convertSteamIdToAccountId(steamId)
    const url = `${OPENDOTA_BASE_URL}/players/${accountId}`
    return this.fetchWithRetry(url)
  }

  getPlayerWinLoss(steamId: string): Promise<WinLoss> {
    const accountId = this.convertSteamIdToAccountId(steamId)
    const url = `${OPENDOTA_BASE_URL}/players/${accountId}/wl`
    return this.fetchWithRetry(url)
  }

  getPlayerMatches(steamId: string, limit = 20): Promise<Match[]> {
    const accountId = this.convertSteamIdToAccountId(steamId)
    const url = `${OPENDOTA_BASE_URL}/players/${accountId}/matches?limit=${limit}`
    return this.fetchWithRetry(url)
  }

  getPlayerHeroes(steamId: string): Promise<HeroStats[]> {
    const accountId = this.convertSteamIdToAccountId(steamId)
    const url = `${OPENDOTA_BASE_URL}/players/${accountId}/heroes`
    return this.fetchWithRetry(url)
  }

  getPlayerPeers(steamId: string): Promise<Peer[]> {
    const accountId = this.convertSteamIdToAccountId(steamId)
    const url = `${OPENDOTA_BASE_URL}/players/${accountId}/peers`
    return this.fetchWithRetry(url)
  }

  getPlayerTotals(steamId: string): Promise<PlayerTotal[]> {
    const accountId = this.convertSteamIdToAccountId(steamId)
    const url = `${OPENDOTA_BASE_URL}/players/${accountId}/totals`
    return this.fetchWithRetry<PlayerTotal[]>(url)
  }

  getPlayerRecentMatches(steamId: string): Promise<Match[]> {
    const accountId = this.convertSteamIdToAccountId(steamId)
    const url = `${OPENDOTA_BASE_URL}/players/${accountId}/recentMatches`
    return this.fetchWithRetry(url)
  }

  getTopPlayers(): Promise<TopPlayer[]> {
    const url = `${OPENDOTA_BASE_URL}/topPlayers`
    return this.fetchWithRetry(url)
  }

  getProPlayers(): Promise<ProPlayer[]> {
    const url = `${OPENDOTA_BASE_URL}/proPlayers`
    return this.fetchWithRetry(url)
  }

  // Helper function to search for oldest match at a specific offset
  private async searchAtOffset(accountId: string, offset: number): Promise<Match | undefined> {
    try {
      const url = `${OPENDOTA_BASE_URL}/players/${accountId}/matches?limit=${MATCH_LIMIT_BATCH}&offset=${offset}`
      const matches = await this.fetchWithRetry<Match[]>(url)

      if (matches.length > 0) {
        // Find the oldest match in this batch
        return matches.reduce((oldest: Match, match: Match) =>
          match.start_time < oldest.start_time ? match : oldest,
        )
      }
    } catch (_error) {
      // Intentionally ignore errors when trying different offsets to find the first match
    }
    return
  }

  // Helper function to refine search around a promising offset
  private async refineSearchAroundOffset(
    accountId: string,
    bestOffset: number,
    bestMatch: Match,
  ): Promise<Match> {
    try {
      const refinedOffset = bestOffset + REFINED_OFFSET_ADDITION
      const url = `${OPENDOTA_BASE_URL}/players/${accountId}/matches?limit=${MATCH_LIMIT_REFINED}&offset=${refinedOffset}`
      const matches = await this.fetchWithRetry<Match[]>(url)

      if (matches.length > 0) {
        const potentialFirst = matches.reduce((oldest: Match, match: Match) =>
          match.start_time < oldest.start_time ? match : oldest,
        )

        if (potentialFirst.start_time < bestMatch.start_time) {
          return potentialFirst
        }
      }
    } catch (_error) {
      // Intentionally ignore errors when trying refined offset search
    }
    return bestMatch
  }

  async getPlayerFirstMatch(steamId: string): Promise<Match | undefined> {
    const accountId = this.convertSteamIdToAccountId(steamId)

    try {
      // First, get total match count to estimate where the first match might be
      const allMatchesUrl = `${OPENDOTA_BASE_URL}/players/${accountId}/matches?limit=${MATCH_LIMIT_SINGLE}`
      const sampleMatches = await this.fetchWithRetry<Match[]>(allMatchesUrl)

      if (sampleMatches.length === 0) {
        return
      }

      // Binary search approach - start from a high offset and work backwards
      let bestOffset = 0
      let bestMatch: Match | undefined

      // Try different offsets to find the oldest match
      for (const offset of MATCH_SEARCH_OFFSETS) {
        const oldestInBatch = await this.searchAtOffset(accountId, offset)

        // Update our best match if this one is older
        if (oldestInBatch && (!bestMatch || oldestInBatch.start_time < bestMatch.start_time)) {
          bestMatch = oldestInBatch
          bestOffset = offset
        }
      }

      // If we found a good candidate, try to get even older matches around that offset
      if (bestMatch && bestOffset > 0) {
        bestMatch = await this.refineSearchAroundOffset(accountId, bestOffset, bestMatch)
      }

      return bestMatch
    } catch (_error) {
      // Intentionally ignore errors in first match detection strategy
    }
    return
  }

  async getPlayerRank(steamId: string): Promise<PlayerRank | undefined> {
    try {
      const accountId = this.convertSteamIdToAccountId(steamId)
      const url = `${OPENDOTA_BASE_URL}/players/${accountId}`
      const player = await this.fetchWithRetry<Player & PlayerRank>(url)

      return {
        rank_tier: player.rank_tier,
        leaderboard_rank: player.leaderboard_rank,
      }
    } catch (_error) {
      return
    }
  }

  async getPlayerWrappedData(steamId: string): Promise<WrappedData> {
    const accountId = this.convertSteamIdToAccountId(steamId)

    const accountExists = await this.validateAccount(steamId)
    if (!accountExists) {
      throw new Error(`Account not found in OpenDota database. 
        
        Please try:
        1. Visit https://www.opendota.com/players/${accountId} to check if your profile exists
        2. Make sure your Steam profile is public
        3. Play a few Dota matches to get tracked by OpenDota
        4. Try using a different Steam ID format
        
        Example working account ID: 111620041 (you can test with this)`)
    }

    // Fetch all data in parallel for better performance
    const [player, winLoss, recentMatches, heroes, peers, rank, totals, allMatches] =
      await Promise.all([
        this.getPlayer(steamId),
        this.getPlayerWinLoss(steamId),
        this.getPlayerRecentMatches(steamId),
        this.getPlayerHeroes(steamId),
        this.getPlayerPeers(steamId),
        this.getPlayerRank(steamId),
        this.getPlayerTotals(steamId),
        this.getPlayerMatches(steamId, MATCH_LIMIT_RECENT),
      ])

    const records = this.calculateRecordsFromTotals(allMatches, totals)
    const topFriends = peers
      .filter((peer) => peer.games >= MATCH_LIMIT_TOP_FRIENDS)
      .sort((a, b) => b.games - a.games)
      .slice(0, MATCH_LIMIT_DISPLAY)

    let firstMatch = await this.getPlayerFirstMatch(steamId)

    if (!firstMatch && allMatches.length > 0) {
      firstMatch = allMatches.reduce((oldest, match) =>
        match.start_time < oldest.start_time ? match : oldest,
      )
    }

    return {
      player,
      rank,
      winLoss,
      firstMatch,
      totalMatches: winLoss.win + winLoss.lose,
      recentMatches,
      topFriends,
      heroes,
      records,
      totals,
    }
  }

  private calculateRecordsFromTotals(matches: Match[], totals: PlayerTotal[]) {
    const safeNum = (val: unknown): number => {
      const num = Number(val)
      return Number.isNaN(num) || !Number.isFinite(num) ? 0 : num
    }

    const getTotalValue = (
      field: string,
    ): { sum: number; count: number; avg: number; max: number } => {
      const total = totals.find((t) => t.field === field)
      if (!total) {
        return { sum: 0, count: 0, avg: 0, max: 0 }
      }

      const sum = safeNum(total.sum)
      const count = safeNum(total.n)
      const avg = count > 0 ? sum / count : 0

      const matchValues = matches.map((m) => safeNum(m[field as keyof Match])).filter((v) => v > 0)
      const max = matchValues.length > 0 ? Math.max(...matchValues) : 0

      return { sum, count, avg, max }
    }

    const kills = getTotalValue("kills")
    const deaths = getTotalValue("deaths")
    const assists = getTotalValue("assists")
    const gpm = getTotalValue("gold_per_min")
    const duration = getTotalValue("duration")

    return {
      maxKills: safeNum(kills.max),
      maxDeaths: safeNum(deaths.max),
      maxAssists: safeNum(assists.max),
      maxGPM: safeNum(gpm.max),
      maxDuration: safeNum(duration.max),
      avgKills: safeNum(Math.round(kills.avg * 10) / 10),
      avgDeaths: safeNum(Math.round(deaths.avg * 10) / 10),
      avgAssists: safeNum(Math.round(assists.avg * 10) / 10),
      avgGPM: safeNum(Math.round(gpm.avg)),
      avgDuration: safeNum(Math.round(duration.avg)),
    }
  }
}

export const openDotaAPI = new OpenDotaAPI()

// Cached versions of frequently used methods for better performance
export const getCachedPlayerWrappedData = cache((steamId: string) =>
  openDotaAPI.getPlayerWrappedData(steamId),
)

export const getCachedProPlayers = cache(() => openDotaAPI.getProPlayers())

export const getCachedTopPlayers = cache(() => openDotaAPI.getTopPlayers())

// Re-export utility functions from heroes.ts for backward compatibility
export const getHeroName = getHeroNameFromHeroes
export const getHeroAvatar = getHeroAvatarFromHeroes

// Utility functions
export function formatDate(timestamp: number): string {
  return new Date(timestamp * MILLISECONDS_PER_SECOND).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function isWin(match: Match): boolean {
  const isRadiant = match.player_slot < RADIANT_PLAYER_SLOT_THRESHOLD
  return isRadiant === match.radiant_win
}

export function getRankName(rankTier?: number): string {
  if (!rankTier) {
    return "Unranked"
  }

  const ranks: Record<string, string> = {
    "1": "Herald",
    "2": "Guardian",
    "3": "Crusader",
    "4": "Archon",
    "5": "Legend",
    "6": "Ancient",
    "7": "Divine",
    "8": "Immortal",
  }

  const tier = Math.floor(rankTier / 10)
  return ranks[tier.toString()] || "Unranked"
}

export function getRankStars(rankTier?: number): number {
  if (!rankTier) {
    return 0
  }
  return rankTier % 10
}

export function getRankIconUrl(rankTier?: number): string {
  if (!rankTier) {
    return "https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_0.png"
  }

  const tier = Math.floor(rankTier / 10)
  return `https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_${tier}.png`
}

export function getRankStarUrl(stars: number): string {
  return `https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_${stars}.png`
}
