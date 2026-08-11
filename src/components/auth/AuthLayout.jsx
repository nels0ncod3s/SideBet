import { Link } from 'react-router-dom'

export default function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <header className="px-6 py-6">
        <Link to="/" className="flex w-fit items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-coin text-sm font-bold text-ink">
            S
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-text-hi">
            SideBet
          </span>
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 pb-16">
        <div className="w-full max-w-sm">
          {eyebrow && (
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-text-faint">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-2xl font-semibold tracking-tight text-text-hi sm:text-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-text-lo">{subtitle}</p>
          )}

          <div className="mt-8">{children}</div>

          {footer && (
            <p className="mt-6 text-center text-sm text-text-lo">{footer}</p>
          )}
        </div>
      </main>
    </div>
  )
}
