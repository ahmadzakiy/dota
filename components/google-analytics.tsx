"use client"

import Script from "next/script"

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export function GoogleAnalytics() {
  if (!GA_TRACKING_ID) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  )
}

// Type for gtag function
type GtagFunction = (command: string, targetId: string, config?: Record<string, unknown>) => void

// Helper function to track events
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== "undefined") {
    const gtag = (window as typeof window & { gtag?: GtagFunction }).gtag
    gtag?.("event", eventName, parameters)
  }
}

// Helper function to track page views
export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && GA_TRACKING_ID) {
    const gtag = (window as typeof window & { gtag?: GtagFunction }).gtag
    gtag?.("config", GA_TRACKING_ID, {
      page_path: url,
    })
  }
}
