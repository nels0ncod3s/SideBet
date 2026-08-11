import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-ink-border/60 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-coin text-sm font-bold text-ink">
            S
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            SideBet
          </span>
        </Link>

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

        <div className="hidden items-center gap-3 sm:flex">
          <Link
            to="/login"
            className="text-sm text-text-lo transition hover:text-text-hi"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-coin px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110"
          >
            Start a pool
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-border text-text-hi sm:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-border/60 bg-ink px-6 py-5 sm:hidden">
          <nav className="flex flex-col gap-4 text-sm text-text-lo">
            <a href="#markets" onClick={() => setOpen(false)} className="hover:text-text-hi">
              Markets
            </a>
            <a href="#how" onClick={() => setOpen(false)} className="hover:text-text-hi">
              How it works
            </a>
            <a href="#" onClick={() => setOpen(false)} className="hover:text-text-hi">
              Guide
            </a>
            <div className="mt-2 flex flex-col gap-3 border-t border-ink-border/60 pt-4">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-ink-border px-4 py-2.5 text-center text-text-hi"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-coin px-4 py-2.5 text-center font-semibold text-ink"
              >
                Start a pool
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
