// OpenDota API response types
export type Player = {
  profile: {
    account_id: number
    personaname: string
    name?: string | null
    plus: boolean
    cheese: number
    steamid: string
    avatar: string
    avatarmedium: string
    avatarfull: string
    profileurl: string
    last_login?: string | null
    loccountrycode?: string
    status?: string | null
    fh_unavailable: boolean
    is_contributor: boolean
    is_subscriber: boolean
  }
  rank_tier?: number
  leaderboard_rank?: number | null
  computed_rating?: number | null
}

export type Match = {
  match_id: number
  player_slot: number
  radiant_win: boolean
  duration: number
  game_mode: number
  lobby_type: number
  hero_id: number
  start_time: number
  version?: number | null
  kills: number
  deaths: number
  assists: number
  skill?: number
  average_rank?: number | null
  xp_per_min?: number
  gold_per_min?: number
  hero_damage?: number
  tower_damage?: number
  hero_healing?: number
  last_hits?: number
  lane?: number | null
  lane_role?: number | null
  is_roaming?: boolean | null
  cluster?: number
  leaver_status: number
  party_size?: number | null
  hero_variant?: number | null
}

export type HeroStats = {
  hero_id: number
  last_played: number
  games: number
  win: number
  with_games: number
  with_win: number
  against_games: number
  against_win: number
}

export type Peer = {
  account_id: number
  last_played: number
  win: number
  games: number
  with_win: number
  with_games: number
  against_win: number
  against_games: number
  with_gpm_sum?: number
  with_xpm_sum?: number
  personaname?: string
  name?: string | null
  is_contributor: boolean
  is_subscriber: boolean
  last_login?: string | null
  avatar?: string
  avatarfull?: string
}

export type PlayerStats = {
  account_id: number
  personaname: string
  name?: string | null
  avatar: string
  avatarfull: string
  profileurl: string
  last_login?: string | null
  loccountrycode?: string
  plus?: boolean
}

export type TopPlayer = {
  account_id: number
  computed_mmr: number
  steamid: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  profileurl: string
  personaname: string
  last_login: string | null
  full_history_time: string
  cheese: number
  fh_unavailable: boolean
  loccountrycode: string
  last_match_time: string
  plus: boolean
  name: string | null
  country_code: string | null
  fantasy_role: number | null
  team_id: number | null
  team_name: string | null
  team_tag: string | null
  is_locked: boolean | null
  is_pro: boolean | null
  locked_until: string | null
  rating: number
  rank_tier: number
}

export type ProPlayer = {
  account_id: number
  steamid: string | null
  avatar: string | null
  avatarmedium: string | null
  avatarfull: string | null
  profileurl: string | null
  personaname: string | null
  last_login: string | null
  full_history_time: string | null
  cheese: number | null
  fh_unavailable: boolean | null
  loccountrycode: string | null
  last_match_time: string | null
  plus: boolean | null
  name: string | null
  country_code: string | null
  fantasy_role: number | null
  team_id: number | null
  team_name: string | null
  team_tag: string | null
  is_locked: boolean | null
  is_pro: boolean | null
  locked_until: string | null
}

export type WinLoss = {
  win: number
  lose: number
}

// Processed data types for our wrapped
export type WrappedData = {
  player: Player
  totalMatches: number
  winLoss: WinLoss
  recentMatches: Match[]
  firstMatch?: Match
  heroes: HeroStats[]
  records: {
    maxKills: number
    maxDeaths: number
    maxAssists: number
    maxGPM: number
    maxDuration: number
    avgKills: number
    avgDeaths: number
    avgAssists: number
    avgGPM: number
    avgDuration: number
  }
  totals: PlayerTotals[]
  topFriends: Peer[]
  rank?: PlayerRank
}

export type PlayerTotals = {
  field: string
  n: number
  sum: number
}

export type PlayerRank = {
  rank_tier?: number
  leaderboard_rank?: number
}
