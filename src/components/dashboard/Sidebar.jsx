import { NavLink, Link } from 'react-router-dom'
import { navItems } from './navItems'

export default function Sidebar({ coins }) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-ink-border/60 bg-ink-raised/40 md:flex">
      <Link to="/" className="flex items-center gap-2 px-6 py-6">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-coin text-sm font-bold text-ink">
          S
        </span>
        <span className="font-display text-lg font-semibold tracking-tight">
          SideBet
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                isActive
                  ? 'bg-ink-card text-text-hi'
                  : 'text-text-lo hover:bg-ink-card/60 hover:text-text-hi'
              }`
            }
          >
            <Icon size={17} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mx-3 mb-6 rounded-xl border border-ink-border bg-ink-card p-4">
        <p className="font-mono text-xs text-text-faint">Balance</p>
        <p className="mt-1 font-display text-lg font-semibold text-coin">
          {(coins ?? 0).toLocaleString()} coins
        </p>
      </div>
    </aside>
  )
}
