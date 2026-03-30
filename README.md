# Dota Wrapped

A Dota stats app that'll tell you exactly how many hours you've wasted feeding mid lane and why your friends stopped playing with you. It's like Spotify Wrapped, but instead of your questionable music taste, it exposes your questionable item builds and that time you went 0/15/2 as carry.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/zakiy-project/dota)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🎮 Features

### Player Statistics Overview
- **Player Profile**: Display Steam profile information including avatar, name, and rank
- **Win/Loss Statistics**: Comprehensive win rate analysis and match history
- **Rank Information**: Current MMR, rank tier, and leaderboard position (if applicable)
- **Account Timeline**: First match played and total career matches

### Detailed Analytics Sections

#### 🏆 Heroes Section
- Most played heroes with win rates and performance metrics
- Hero-specific statistics including games played, wins, and losses
- Visual hero avatars and detailed performance breakdown
- Sortable and filterable hero statistics

#### 👥 Friends Section
- Top gaming companions based on matches played together
- Win rate analysis with each friend
- Clickable friend profiles to view their statistics
- Visual ranking of most frequent gaming partners

#### 📊 Recent Matches
- Detailed match history with hero selections
- Match duration, KDA (Kills/Deaths/Assists), and GPM analysis
- Win/loss indicators and performance metrics
- Sortable match data with advanced filtering options

#### 📈 Total Statistics
- Comprehensive lifetime statistics across all matches
- Performance records including highest KDA, GPM, and longest matches
- Average performance metrics and career milestones
- Searchable and sortable statistical breakdowns

#### 🔗 Social Sharing
- Share your Dota wrapped results with friends
- Social media integration for showcasing achievements
- Shareable profile links and statistics summaries

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm 10 (recommended)
- A valid Steam ID (public profile required)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahmadzakiy/dota.git
   cd dota
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:9001](http://localhost:9001)

### Usage

1. **Enter your Steam ID**: Input your Steam ID on the homepage
2. **Generate Wrapped**: Click "Generate my wrapped" to fetch your statistics
3. **Explore Your Data**: Navigate through different sections to view your Dota performance
4. **Share Results**: Use the social sharing features to share your achievements

## 🛠️ Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) | 15 |
| UI Library | [React](https://react.dev/) | 19 |
| Language | [TypeScript](https://www.typescriptlang.org/) | 5 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | 4 |
| Components | [Radix UI](https://www.radix-ui.com/) + Shadcn-like architecture | — |
| Icons | [Lucide React](https://lucide.dev/) | — |
| Charts | [Recharts](https://recharts.org/) | 2 |
| Validation | [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/) | — |
| Animation | [Motion](https://motion.dev/) + CSS transitions | — |
| Linting / Formatting | [Biome](https://biomejs.dev/) 2 + Ultracite preset | — |
| Toast | [Sonner](https://sonner.emilkowal.dev/) | — |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) (dark default) | — |
| Virtualization | [react-window](https://github.com/bvaughn/react-window) | — |
| Data Source | [OpenDota API](https://docs.opendota.com/) | — |
| Package Manager | [pnpm](https://pnpm.io/) | 10 |
| Deployment | [Vercel](https://vercel.com/) | — |

## 📁 Project Structure

```
app/
├── globals.css               # Tailwind imports + CSS variables + animations
├── layout.tsx                # Root layout (fonts, theme, GTM, floating dock)
├── page.tsx                  # Landing / home page (Steam ID input)
├── id/
│   ├── page.tsx              # Steam ID lookup redirect
│   └── [steamId]/
│       ├── page.tsx          # Player wrapped data page (SSR + Suspense streaming)
│       ├── loading.tsx       # Loading skeleton
│       └── error.tsx         # Error boundary
├── pro-players/
│   ├── page.tsx              # Pro players listing
│   └── error.tsx             # Error boundary
└── privacy/
    └── page.tsx              # Privacy policy

components/
├── ui/                       # Reusable UI primitives (Radix-based, Shadcn-style)
├── dynamic-imports.tsx       # Dynamic import wrappers (code splitting)
├── loading-skeletons.tsx     # Skeleton components for Suspense boundaries
├── player-overview.tsx       # Player profile header + rank
├── heroes-section.tsx        # Top heroes breakdown
├── recent-matches-section.tsx # Recent match history
├── total-stats-section.tsx   # Lifetime stat records
├── friends-section.tsx       # Top party friends
├── social-sharing.tsx        # Share buttons / OG image
├── pro-players-table.tsx     # Searchable pro players table
├── loading-screen.tsx        # Full-page loading animation
├── themed-floating-dock.tsx  # Bottom navigation dock
├── theme-provider.tsx        # Dark mode provider
└── footer.tsx                # Site footer

lib/
├── opendota-api.ts           # OpenDota API client (retry, caching, rate limiting)
├── types.ts                  # TypeScript types (Player, Match, HeroStats, Peer, etc.)
├── heroes.ts                 # Hero name/avatar mapping (static data)
├── data.json                 # Static reference data
└── utils.ts                  # cn() utility (clsx + tailwind-merge)

scripts/
└── download-heroes.mjs       # Hero image download script
```

## 🎯 Key Features Implementation

### OpenDota API Integration
- Comprehensive API wrapper with error handling, retry logic, and rate limiting (50ms delay)
- Steam ID validation and automatic conversion (Steam ID → Account ID)
- HTTP caching with `next: { revalidate }` for edge CDN caching
- React `cache()` for SSR request deduplication
- Bounded data fetching (50 heroes, 20 peers) to prevent memory issues

### Performance Optimizations
- **Suspense Streaming**: Each section wrapped in `<Suspense>` boundaries for progressive loading (~200ms TTFB)
- **ISR Revalidation**: Daily page regeneration (86,400s) to reduce server workload
- **Dynamic Imports**: Heavy components (gradient animation, pro players table) code-split with `next/dynamic`
- **Memoization**: `useMemo` for expensive filtering/sorting in heroes, matches, and stats sections
- **Ref-based Animation**: Gradient animation uses `useRef` + `requestAnimationFrame` instead of state updates (zero React overhead)
- **Reduced Motion Support**: Respects `prefers-reduced-motion` for accessibility and CPU savings

### Responsive Design
- Mobile-first responsive layout
- Optimized for desktop, tablet, and mobile viewing
- Interactive components with smooth animations
- Accessible design following WCAG guidelines

## 🔧 Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server on port 9001 |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Lint + auto-fix (Biome) |
| `pnpm format` | Format code (Biome) |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style (Biome configuration)
- Add TypeScript types for all new code
- Test your changes across different screen sizes
- Ensure accessibility standards are maintained

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [OpenDota](https://www.opendota.com/) for providing the comprehensive Dota API
- [Valve](https://www.valvesoftware.com/) for creating Dota
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- The Dota community for inspiration and feedback

## 🐛 Bug Reports & Feature Requests

If you encounter any issues or have suggestions for improvements, please:

1. Check existing [issues](https://github.com/ahmadzakiy/dota/issues)
2. Create a new issue with detailed description
3. Include steps to reproduce (for bugs)
4. Attach screenshots if applicable

## 📊 API Information

This application uses the [OpenDota API](https://docs.opendota.com/) to fetch Dota player statistics. Please note:

- Your Steam profile must be public to access statistics
- Data may take time to appear for new accounts
- Rate limiting may apply during peak usage
- Some statistics require recent match activity

---

**Defend the Ancient. Analyze the Performance. Share the Glory.**
