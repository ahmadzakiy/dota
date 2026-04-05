"use client"

import { useEffect } from "react"
import { useTheme } from "@/components/theme-provider"

const faviconByTheme = {
  dark: "/favicon-dark.svg",
  light: "/favicon-light.svg",
} as const

export function FaviconSync() {
  const { theme } = useTheme()

  useEffect(() => {
    const faviconHref = faviconByTheme[theme]
    const existingLink = document.querySelector<HTMLLinkElement>("link[rel='icon']")

    if (existingLink) {
      existingLink.href = faviconHref
      existingLink.media = "all"
      return
    }

    const link = document.createElement("link")
    link.rel = "icon"
    link.href = faviconHref
    document.head.append(link)
  }, [theme])

  return null
}
