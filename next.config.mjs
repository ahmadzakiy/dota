/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  headers() {
    // Different CSP for dev vs production
    // Dev mode needs 'unsafe-inline' for Next.js hot reloading
    // Production should use strict CSP without unsafe-inline
    const isDev = process.env.NODE_ENV === "development"

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              isDev
                ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;"
                : "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com;",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' data: https://www.opendota.com https://avatars.steamstatic.com https://flagcdn.com;",
              "font-src 'self' data:;",
              "connect-src 'self' https://api.opendota.com https://www.google-analytics.com;",
              "frame-src 'none';",
              "object-src 'none';",
              "base-uri 'self';",
              "form-action 'self';",
            ].join(" "),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ]
  },
}

export default nextConfig
