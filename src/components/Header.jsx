export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-border/60 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-coin text-sm font-bold text-ink">
            S
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            SideBet
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-text-lo md:flex">
          <a href="#markets" className="transition hover:text-text-hi">
            Markets
          </a>
          <a href="#how" className="transition hover:text-text-hi">
            How it works
          </a>
          <a href="#" className="transition hover:text-text-hi">
            Guide
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden text-sm text-text-lo transition hover:text-text-hi sm:block"
          >
            Log in
          </a>
          <a
            href="#create"
            className="rounded-full bg-coin px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110"
          >
            Start a pool
          </a>
        </div>
      </div>
    </header>
  )
}
