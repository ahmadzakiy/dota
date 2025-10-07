import type { Metadata } from "next"
import { Bodoni_Moda, Inter, Kode_Mono } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemedFloatingDock } from "@/components/themed-floating-dock"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const kodeMono = Kode_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kode-mono",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bodoni-moda",
})

export const metadata: Metadata = {
  title: "Dota Wrapped",
  description:
    "A Dota stats app that'll tell you exactly how many hours you've wasted feeding mid lane and why your friends stopped playing with you. It's like Spotify Wrapped, but instead of your questionable music taste, it exposes your questionable item builds and that time you went 0/15/2 as carry.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      className={`${kodeMono.variable} ${inter.variable} ${bodoniModa.variable} dark`}
      lang="en"
    >
      <body className="min-h-screen bg-neutral-800 font-sans text-foreground">
        <ThemeProvider defaultTheme="dark">
          {children}
          <ThemedFloatingDock />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
