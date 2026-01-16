# Dota Wrapped - AI Coding Guide

A Next.js 15 App Router application that displays Dota 2 player statistics using the OpenDota API. Built with TypeScript, Tailwind CSS v4, and Biome for code quality.

## Architecture Overview

### Data Flow Pattern
- **Server Components** (`app/id/[steamId]/page.tsx`, `app/pro-players/page.tsx`): Fetch data server-side using React's `cache()` wrapper
- **API Layer** (`lib/opendota-api.ts`): Centralized OpenDota API client with retry logic, rate limiting (50ms delay), and Steam ID conversion
- **Client Components**: Only for interactive UI (search forms, theme toggles) - marked with `"use client"`

### Key Files
- `lib/opendota-api.ts` - OpenDota API wrapper with caching (`getCachedPlayerWrappedData`, `getCachedProPlayers`)
- `lib/types.ts` - All TypeScript types for OpenDota responses and processed data
- `lib/heroes.ts` - Hero data mapping (ID to name/avatar)
- `components/ui/` - shadcn/ui components (use `npx shadcn@latest add [component]`)

## Critical Developer Workflows

### Development
```bash
pnpm dev              # Starts dev server on port 9001 (not 3000!)
pnpm lint             # Biome lint with auto-fix
pnpm format           # Biome format
```

### Adding UI Components
This project uses shadcn/ui with the "new-york" style and custom Aceternity registry:
```bash
npx shadcn@latest add button  # Standard shadcn components
# Aceternity components configured in components.json
```

### API Data Fetching Pattern
```typescript
// ✅ Good: Server component with cached API call
import { getCachedPlayerWrappedData } from "@/lib/opendota-api"

export default async function Page({ params }: { params: { steamId: string } }) {
  const data = await getCachedPlayerWrappedData(params.steamId)
  return <div>{data.player.profile.personaname}</div>
}

// ❌ Bad: Client-side fetching in server components
"use client"
const [data, setData] = useState()
useEffect(() => { fetch(...) }, [])
```

## Project-Specific Conventions

### Steam ID Handling
- **Always convert to Account ID** in `opendota-api.ts` using `convertSteamIdToAccountId()`
- Steam ID (17 digits): `76561198071885769` → Account ID (9 digits): `111620041`
- Example: `https://www.opendota.com/players/111620041`

### Error Handling Strategy
- OpenDota API errors provide detailed user guidance (see `fetchWithRetry()`)
- HTTP 404: Account not found → Suggest profile checking
- HTTP 429: Rate limit → Tell user to wait
- Retry 3 times with exponential backoff (1s, 2s, 3s)

### Component Patterns
1. **Card-based layouts** - Use `Card`, `CardHeader`, `CardTitle`, `CardContent` from `components/ui/card.tsx`
2. **Data slots** - Components use `data-slot` attributes for CSS targeting
3. **Loading states** - Each route has `loading.tsx` and `error.tsx` boundaries

### Styling Conventions
- **Tailwind v4** - Uses new `@theme` syntax in `app/globals.css`
- **Font variables** - Kode Mono (monospace), Inter (sans), Bodoni Moda (serif)
- **Dark mode only** - Theme provider defaults to dark, minimal light mode support
- **Line width** - Biome configured for 100 character lines (not 80)

## Integration Points

### OpenDota API
- **Base URL**: `https://api.opendota.com/api`
- **Rate limiting**: 50ms delay between requests (configurable in `API_DELAY_MS`)
- **No auth required** - Public API endpoints only
- **Account validation**: Always call `validateAccount()` before fetching player data

### External Dependencies
- **Hero images**: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/{hero_name}_full.png`
- **Rank icons**: `https://www.opendota.com/assets/images/dota2/rank_icons/`
- **Player avatars**: From Steam CDN via OpenDota player profile

### Data Processing Patterns
```typescript
// Match win detection (Radiant vs Dire slot logic)
export function isWin(match: Match): boolean {
  const isRadiant = match.player_slot < 128  // RADIANT_PLAYER_SLOT_THRESHOLD
  return isRadiant === match.radiant_win
}

// Safe number conversion (handles NaN, Infinity)
const safeNum = (val: unknown): number => {
  const num = Number(val)
  return Number.isNaN(num) || !Number.isFinite(num) ? 0 : num
}
```

## Code Quality Rules (Biome + Ultracite)

### TypeScript
- Use `import type` for type-only imports (enforced by Biome)
- No enums - use const objects or union types
- No non-null assertions (`!`) - handle undefined explicitly
- Prefer `T[]` over `Array<T>` for consistency

### React/Next.js
- Server components by default - only add `"use client"` when needed
- Use Next.js `<Image>` not `<img>` (disabled in `next.config.mjs` for this project)
- All dependencies in React hooks must be specified (warn level)
- No Array index as key - use stable IDs

### Common Tasks
- `npx biome lint --write` - Auto-fix linting issues before committing
- Lefthook runs Biome on pre-commit (configured in `lefthook.yml`)
- TypeScript/ESLint ignored during builds (`ignoreBuildErrors: true`)

## Testing Player Statistics
Use these working Steam IDs for testing:
- `111620041` - Example account with full match history
- Visit player page: `/id/111620041` or `/id/76561198071885769`

---

> **Note**: Comprehensive code quality rules (accessibility, TypeScript best practices, React patterns, etc.) are enforced via Ultracite/Biome and available in `.cursor/rules/ultracite.mdc`. Focus on the project-specific patterns above when coding.

## Quick Reference

### File Structure
```
app/
  ├── page.tsx              # Homepage with Steam ID search
  ├── id/[steamId]/page.tsx # Player wrapped stats page
  └── pro-players/page.tsx  # Pro players listing

lib/
  ├── opendota-api.ts       # API client with caching
  ├── types.ts              # TypeScript definitions
  └── heroes.ts             # Hero data utilities

components/
  ├── ui/                   # shadcn components
  ├── *-section.tsx         # Data display sections
  └── theme-provider.tsx    # Dark mode provider
```

### Common Pitfalls
1. **Don't forget Steam ID conversion** - Always use `convertSteamIdToAccountId()` in API calls
2. **Server vs Client components** - Default to server components, only use `"use client"` for interactivity
3. **Port number** - Dev server runs on port **9001**, not 3000
4. **Image optimization** - Disabled in this project (`unoptimized: true` in next.config)
5. **API rate limiting** - 50ms delay between requests to avoid throttling

