"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { TableSkeleton } from "./loading-skeletons"

// Dynamic import for GradientAnimation to reduce initial bundle size
// This component is heavy due to SVG filters and complex CSS animations
export const GradientAnimation = dynamic(
  () => import("@/components/ui/gradient-animation").then((mod) => mod.GradientAnimation),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[linear-gradient(40deg,rgb(15,23,42),rgb(0,0,0))]">
        <Skeleton className="h-full w-full" />
      </div>
    ),
  },
)

// Dynamic import for ProPlayersTable to reduce initial bundle size
// This component uses react-window which is heavy
export const ProPlayersTable = dynamic(
  () => import("@/components/pro-players-table").then((mod) => mod.ProPlayersTable),
  {
    ssr: false,
    loading: () => <TableSkeleton columns={4} rows={20} />,
  },
)
