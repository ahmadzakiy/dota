export function Footer() {
  return (
    <footer className="relative z-1 mx-4 mt-8 space-y-4 text-center text-muted-foreground text-sm">
      <div className="space-y-1">
        <p>Data provided by OpenDota. Dota 2 is a registered trademark of Valve Corporation.</p>
        <p>This site is not affiliated with, endorsed, or sponsored by Valve Corporation.</p>
      </div>

      <div className="flex justify-center gap-4 text-xs">
        <a className="hover:text-primary hover:underline" href="/privacy">
          Privacy Policy
        </a>
        <span>•</span>
        <a
          className="hover:text-primary hover:underline"
          href="/.well-known/security.txt"
          rel="noopener noreferrer"
          target="_blank"
        >
          Security
        </a>
        <span>•</span>
        <div className="flex items-center gap-1">
          <span className="text-green-400">🔒</span>
          <span>HTTPS Secured</span>
        </div>
        <span>•</span>
        <a
          className="hover:text-primary hover:underline"
          href="https://ahmadzakiy.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Created by amorfateh
        </a>
      </div>
    </footer>
  )
}
