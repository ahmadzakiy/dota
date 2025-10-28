"use client"

import { House, Moon, ShieldCheck, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { FloatingDock } from "@/components/ui/floating-dock"

const baseLinks = [
  {
    title: "Back to Home",
    icon: <House className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/",
  },
  {
    title: "Go to Pro Players Page",
    icon: <ShieldCheck className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/pro-players",
  },
  // {
  //   title: "Go to amorfateh",
  //   icon: (
  //     <img
  //       alt="Aceternity Logo"
  //       height={40}
  //       src="/sijaki.png"
  //       style={{ borderRadius: "50%" }}
  //       width={40}
  //     />
  //   ),
  //   href: "https://ahmadzakiy.com",
  // },
]

export function ThemedFloatingDock() {
  const { theme, toggleTheme } = useTheme()

  const themeToggleItem = {
    title: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
    icon:
      theme === "dark" ? (
        <Sun className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ) : (
        <Moon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    href: "#",
    onClick: toggleTheme,
  }

  const links = [...baseLinks, themeToggleItem]

  return <FloatingDock items={links} />
}
