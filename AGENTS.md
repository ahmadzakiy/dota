# Dota Wrapped — Development Rules & Standards

> **Dota Wrapped** is an unofficial Dota 2 stats viewer (like "Spotify Wrapped" for Dota). It shows yearly performance, hero stats, records, top friends, and recent matches. Data comes from the [OpenDota API](https://docs.opendota.com/). Deployed at **dotawrapped.com**.

---

## Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15 |
| UI Library | React | 19 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 4 |
| Components | Radix UI primitives + Shadcn-like architecture | — |
| Icons | Lucide React | — |
| Charts | Recharts | 2 |
| Validation | Zod + React Hook Form | — |
| Animation | Motion (framer-motion) + CSS transitions | — |
| Fonts | Inter (sans), Kode Mono (mono), Bodoni Moda (serif) via `next/font` | — |
| Linting / Formatting | Biome 2 + Ultracite preset | — |
| Git Hooks | Lefthook (pre-commit: lint + format) | — |
| Toast | Sonner | — |
| Theming | next-themes (dark default) | — |
| Analytics | Google Tag Manager | — |
| Package Manager | pnpm 10 | — |
| Virtualization | react-window | — |

---

## Project Structure

```
app/
├── globals.css          # Tailwind imports + CSS variables + animations
├── layout.tsx           # Root layout (fonts, theme, GTM, floating dock)
├── page.tsx             # Landing / home page (Steam ID input)
├── id/
│   ├── page.tsx         # Steam ID lookup redirect
│   └── [steamId]/
│       ├── page.tsx     # Player wrapped data page (SSR)
│       ├── loading.tsx  # Loading skeleton
│       └── error.tsx    # Error boundary
├── pro-players/
│   ├── page.tsx         # Pro players listing
│   └── error.tsx        # Error boundary
└── privacy/
    └── page.tsx         # Privacy policy

components/
├── ui/                  # Reusable UI primitives (Radix-based, Shadcn-style)
│   ├── button.tsx, card.tsx, badge.tsx, input.tsx, label.tsx
│   ├── select.tsx, dropdown-menu.tsx, hover-card.tsx
│   ├── table.tsx, pagination.tsx, scroll-area.tsx
│   ├── skeleton.tsx, progress.tsx, avatar.tsx
│   ├── sonner.tsx, floating-dock.tsx
│   └── background-gradient.tsx, gradient-animation.tsx
├── player-overview.tsx          # Player profile header + rank
├── heroes-section.tsx           # Top heroes breakdown
├── recent-matches-section.tsx   # Recent match history
├── total-stats-section.tsx      # Lifetime stat records
├── friends-section.tsx          # Top party friends
├── social-sharing.tsx           # Share buttons / OG image
├── pro-players-table.tsx        # Searchable pro players table
├── loading-screen.tsx           # Full-page loading animation
├── themed-floating-dock.tsx     # Bottom navigation dock
├── theme-provider.tsx           # Dark mode provider
└── footer.tsx                   # Site footer

lib/
├── opendota-api.ts      # OpenDota API client (class-based, with retry + caching)
├── types.ts             # TypeScript types (Player, Match, HeroStats, Peer, etc.)
├── heroes.ts            # Hero name/avatar mapping (static data)
├── data.json            # Static reference data
└── utils.ts             # cn() utility (clsx + tailwind-merge)

styles/
└── globals.css          # Additional global styles
```

---

## Component Architecture

- **MUST**: Use Server Components by default. Add `'use client'` only for interactivity (state, effects, event listeners).
- **MUST**: Use `clsx` + `tailwind-merge` via the `cn()` utility from `@/lib/utils` for class merging.
- **MUST**: Use Radix UI primitives for complex interactive elements (Dialog, Popover, Dropdown, Tabs, etc.).
- **MUST**: Use `class-variance-authority` (CVA) for component variants (see `button.tsx`, `badge.tsx`).
- **MUST**: Export named exports (not default) for components.
- **MUST**: All `ui/` components follow the Shadcn pattern — thin wrappers around Radix with Tailwind styling.
- **SHOULD**: Colocate feature-specific components near their route. Shared components go in `components/`.

---

## Styling (Tailwind CSS 4)

- **MUST**: Use semantic CSS variables (defined in `globals.css`) via Tailwind — e.g. `bg-primary`, `text-muted-foreground`. Never use hardcoded hex/oklch values in JSX.
- **MUST**: Mobile-first responsive design (`<div className="flex md:grid">`).
- **MUST**: Use `data-[state=open]:` attributes for Radix component styling.
- **MUST**: Use `@theme inline` block in `globals.css` to map CSS vars → Tailwind tokens.
- **NEVER**: Use `@apply` for component styles — keep utility classes in JSX.
- **SHOULD**: Use `size-*` shorthand (`size-4` = `w-4 h-4`).
- **SHOULD**: Dark mode is the default. Use `.dark` class variant; `color-scheme: dark` is set on `<html>`.

---

## React 19 & Next.js 15 Patterns

- **MUST**: Use `next/image` for all images (auto-optimize, prevent CLS).
- **MUST**: Use `next/link` for internal navigation.
- **MUST**: Use `next/font` for font loading (Inter, Kode Mono, Bodoni Moda are configured).
- **MUST**: Implement `loading.tsx` and `error.tsx` for route segments.
- **SHOULD**: Use Server Actions for data mutations.
- **SHOULD**: Use `React.cache()` for deduplicating server-side data fetches (see `opendota-api.ts`).
- **MUST**: Use `<Form>` or `react-hook-form` + Zod for complex form inputs.

---

## Data Layer (OpenDota API)

- **MUST**: All API calls go through the `OpenDotaAPI` class in `lib/opendota-api.ts`.
- **MUST**: Use `fetchWithRetry()` for all API calls (handles 429 rate limits with exponential backoff).
- **MUST**: Use `getCachedPlayerWrappedData()`, `getCachedProPlayers()`, `getCachedTopPlayers()` — React `cache()`-wrapped versions for SSR deduplication.
- **MUST**: Types for API responses live in `lib/types.ts` — keep them in sync with the API.
- **MUST**: Hero name/avatar lookups use `lib/heroes.ts` (static, no API call needed).
- **MUST**: Convert Steam IDs to account IDs via `convertSteamIdToAccountId()` before calling API.

---

## Forms & Validation

- **MUST**: Zod schema for all form validation.
- **MUST**: Server-side validation is mandatory; client-side is for UX only.
- **MUST**: Clear inline error messages next to fields; on submit, focus first error.
- **MUST**: Disable submit button and show loading state during network requests.
- **MUST**: Use `sonner` for toast notifications (success/error feedback via `<Toaster>` in root layout).
- **MUST**: Support `autocomplete` + meaningful `name`; correct `type` and `inputmode`.
- **MUST**: Allow paste in all inputs; compatible with password managers.

---

## User Experience & Interactions

### Keyboard & Focus
- **MUST**: Full keyboard support per [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/).
- **MUST**: Visible focus rings (`:focus-visible`; group with `:focus-within`).
- **MUST**: Manage focus in modals (trap, loop, return to trigger on close).
- **NEVER**: `outline: none` without a visible focus replacement.

### Touch & Mobile
- **MUST**: Touch targets ≥ 44px; visual < 24px must expand hit area.
- **MUST**: `<input>` font-size ≥ 16px to prevent iOS auto-zoom.
- **MUST**: `touch-action: manipulation` on buttons/inputs.
- **NEVER**: Disable browser zoom (`user-scalable=no`, `maximum-scale=1`).

### State & Navigation
- **MUST**: URL reflects shareable state (search params, filters, pagination).
- **MUST**: Back/Forward restores scroll position.
- **MUST**: Links use `<a>`/`<Link>` for navigation (support Cmd/Ctrl/middle-click).
- **NEVER**: Use `<div onClick>` for navigation.

### Feedback
- **SHOULD**: Optimistic UI; rollback or offer Undo on failure.
- **MUST**: Confirm destructive actions or provide Undo window.
- **MUST**: Use polite `aria-live` for toasts/inline validation.

---

## Accessibility (a11y)

- **MUST**: All `img` tags need descriptive `alt` text (or `""` if decorative).
- **MUST**: Icon-only buttons must have `aria-label` or `sr-only` text.
- **MUST**: Contrast ratio ≥ 4.5:1 for normal text. Prefer [APCA](https://apcacontrast.com/) over WCAG 2.
- **MUST**: Semantic HTML (`<main>`, `<section>`, `<nav>`, `<button>` — not `<div>`).
- **MUST**: `aria-expanded`, `aria-controls` for toggles/accordions (Radix handles this automatically).
- **MUST**: `prefers-reduced-motion` disables or reduces heavy animations.
- **MUST**: Accessible names exist even when visuals omit labels.
- **MUST**: Decorative elements use `aria-hidden`.
- **MUST**: `<title>` matches current context.
- **MUST**: `scroll-margin-top` on headings; "Skip to content" link; hierarchical `<h1>`–`<h6>`.

---

## Animation

- **MUST**: Honor `prefers-reduced-motion` (provide reduced variant or disable).
- **MUST**: Animate compositor-friendly props only (`transform`, `opacity`).
- **MUST**: Animations are interruptible and input-driven (no autoplay).
- **MUST**: Correct `transform-origin` (motion starts where it "physically" should).
- **NEVER**: Animate layout props (`top`, `left`, `width`, `height`).
- **NEVER**: `transition: all` — list properties explicitly.
- **SHOULD**: Prefer CSS > Web Animations API > JS libraries.
- **SHOULD**: Animate only to clarify cause/effect or add deliberate delight.

---

## Performance

- **MUST**: Defer heavy JS (charts, maps) using `next/dynamic` or `React.lazy`.
- **MUST**: Font optimization via `next/font` (already configured with `display: "swap"`).
- **MUST**: Virtualize large lists (> 50 items) — `react-window` is installed.
- **MUST**: Preload above-fold images; lazy-load the rest.
- **MUST**: Prevent CLS (explicit image dimensions via `next/image`).
- **MUST**: Iterate on Core Web Vitals (LCP, CLS, INP).
- **MUST**: Batch layout reads/writes; avoid reflows/repaints.
- **MUST**: Mutations (`POST`/`PATCH`/`DELETE`) target < 500ms.
- **SHOULD**: Use `Suspense` boundaries for granular loading states.
- **SHOULD**: Use `<link rel="preconnect">` for CDN domains.
- **SHOULD**: Prefer uncontrolled inputs; controlled inputs cheap per keystroke.

---

## Layout

- **MUST**: Deliberate alignment to grid/baseline/edges — no accidental placement.
- **MUST**: Verify mobile, laptop, ultra-wide (simulate ultra-wide at 50% zoom).
- **MUST**: Respect safe areas (`env(safe-area-inset-*)`).
- **MUST**: Avoid unwanted scrollbars; fix overflows.
- **MUST**: Skeletons mirror final content to avoid layout shift.
- **SHOULD**: Flex/grid over JS measurement for layout.
- **SHOULD**: Optical alignment; adjust ±1px when perception beats geometry.

---

## Content Handling

- **MUST**: Text containers handle long content (`truncate`, `line-clamp-*`, `break-words`).
- **MUST**: Flex children need `min-w-0` to allow truncation.
- **MUST**: Handle empty states — no broken UI for empty strings/arrays.
- **MUST**: `font-variant-numeric: tabular-nums` for number comparisons.
- **MUST**: Locale-aware dates/times/numbers (`Intl.DateTimeFormat`, `Intl.NumberFormat`).
- **MUST**: Use `…` character (not `...`).
- **MUST**: Non-breaking spaces: `10&nbsp;MB`, `⌘&nbsp;K`, brand names.

---

## Dark Mode & Theming

- **MUST**: `color-scheme: dark` on `<html>` for dark themes (default).
- **MUST**: Theme is managed by `next-themes` via `<ThemeProvider>` in root layout.
- **MUST**: Native `<select>`: explicit `background-color` and `color` (Windows fix).
- **SHOULD**: `<meta name="theme-color">` matches page background.

---

## Design

- **SHOULD**: Layered shadows (ambient + direct).
- **SHOULD**: Crisp edges via semi-transparent borders + shadows.
- **SHOULD**: Nested radii: child ≤ parent; concentric.
- **SHOULD**: Hue consistency: tint borders/shadows/text toward background hue.
- **MUST**: Accessible charts (color-blind-friendly palettes) — Recharts chart colors use `--chart-1` through `--chart-5`.
- **MUST**: Increase contrast on `:hover`/`:active`/`:focus`.

---

## Security Headers

The app sets the following headers via `next.config.mjs`:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy` (restricts scripts, images, connects to OpenDota + Google Analytics)
- `Strict-Transport-Security` (HSTS with preload)

**MUST**: Update CSP when adding new external domains (CDN, API, analytics, etc.).

---

## Code Quality (Biome 2 + Ultracite)

- **MUST**: No unused variables or imports.
- **MUST**: Strict type safety — no `any` types (enforced via `noExplicitAny: warn`).
- **MUST**: Use `import type` for type-only imports (enforced: `useImportType: error`).
- **MUST**: No magic numbers without explanation (enforced: `noMagicNumbers: warn`).
- **MUST**: No `console.log` in production code (enforced: `noConsole: warn`).
- **MUST**: Use `next/image` instead of `<img>` (enforced: `noImgElement: warn`).
- **MUST**: All `<button>` elements have a `type` attribute (enforced: `useButtonType: error`).
- **MUST**: Run `pnpm format` and `pnpm lint` before committing (automated via Lefthook).

### Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server on port 9001 |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm format` | Format code (Biome) |
| `pnpm lint` | Lint + auto-fix (Biome) |

---

## Hydration

- **MUST**: Inputs with `value` need `onChange` (or use `defaultValue`).
- **SHOULD**: Guard date/time rendering against hydration mismatch (server vs. client locale).