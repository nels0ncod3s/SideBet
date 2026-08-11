export default function Footer() {
  return (
    <footer className="border-t border-ink-border/60">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coin text-xs font-bold text-ink">
                S
              </span>
              <span className="font-display text-base font-semibold">
                SideBet
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-text-faint">
              SideBet is currently a play-money product. Coins are earned
              in-app, carry no cash value, and can't be withdrawn or
              purchased with real money.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-text-faint">
                Product
              </p>
              <ul className="space-y-2 text-text-lo">
                <li><a href="#markets" className="hover:text-text-hi">Markets</a></li>
                <li><a href="#how" className="hover:text-text-hi">How it works</a></li>
                <li><a href="#" className="hover:text-text-hi">Guide</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-text-faint">
                Legal
              </p>
              <ul className="space-y-2 text-text-lo">
                <li><a href="#" className="hover:text-text-hi">Terms</a></li>
                <li><a href="#" className="hover:text-text-hi">Privacy</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-text-faint">
                Elsewhere
              </p>
              <ul className="space-y-2 text-text-lo">
                <li><a href="#" className="hover:text-text-hi">X</a></li>
                <li><a href="#" className="hover:text-text-hi">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-text-faint">
          © {new Date().getFullYear()} SideBet. Built for the group chat.
        </p>
      </div>
    </footer>
  )
}
