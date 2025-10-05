# Dota Wrapped 🛡️

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
- pnpm (recommended) or npm
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
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:9001](http://localhost:9001)

### Usage

1. **Enter your Steam ID**: Input your Steam ID on the homepage
2. **Generate Wrapped**: Click "Generate my wrapped" to fetch your statistics
3. **Explore Your Data**: Navigate through different sections to view your Dota performance
4. **Share Results**: Use the social sharing features to share your achievements

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom CSS animations
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Data Source**: [OpenDota API](https://docs.opendota.com/) for Dota statistics
- **Code Quality**: [Biome](https://biomejs.dev/) for formatting and linting
- **Package Manager**: [pnpm](https://pnpm.io/) for faster installs
- **Deployment**: [Vercel](https://vercel.com/) for hosting

## 📁 Project Structure

```
dota/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage with Steam ID input
│   ├── [steamId]/page.tsx        # Dynamic player profile page
│   ├── layout.tsx                # Root layout component
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # Reusable UI components (buttons, cards, etc.)
│   ├── animate-ui/               # Custom animation components
│   ├── friends-section.tsx       # Friends analytics component
│   ├── heroes-section.tsx        # Heroes statistics component
│   ├── player-overview.tsx       # Player profile overview
│   ├── recent-matches-section.tsx # Match history component
│   ├── total-stats-section.tsx   # Lifetime statistics component
│   └── social-sharing.tsx        # Social media sharing component
├── lib/                          # Utility libraries
│   ├── opendota-api.ts          # OpenDota API integration
│   ├── types.ts                 # TypeScript type definitions
│   ├── utils.ts                 # Utility functions
│   └── heroes.ts                # Hero data and utilities
├── public/                       # Static assets
└── styles/                       # Additional stylesheets
```

## 🎯 Key Features Implementation

### OpenDota API Integration
- Comprehensive API wrapper with error handling and rate limiting
- Steam ID validation and account verification
- Efficient data fetching with caching strategies
- Support for both Steam ID and Account ID formats

### Responsive Design
- Mobile-first responsive layout
- Optimized for desktop, tablet, and mobile viewing
- Interactive components with smooth animations
- Accessible design following WCAG guidelines

### Performance Optimizations
- Client-side data fetching with loading states
- Image optimization with Next.js Image component
- Efficient component re-rendering with React optimization techniques
- Code splitting and lazy loading for better performance

## 🔧 Scripts

- `pnpm dev` - Start development server on port 9001
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run Biome linter and auto-fix issues
- `pnpm format` - Format code with Biome

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
- [Valve Corporation](https://www.valvesoftware.com/) for creating Dota
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

**Defend the Ancient. Analyze the Performance. Share the Glory.** ⚔️
