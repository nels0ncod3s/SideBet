import { NavLink, Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { navItems } from './navItems'
import { clearSession } from '../../lib/mockAuth'
import { formatNaira } from '../../lib/currency'

export default function Sidebar({ coins }) {
  const navigate = useNavigate()

  function handleLogout() {
    clearSession()
    navigate('/')
  }

  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-line/60 bg-paper-raised/40 md:flex">
      <Link to="/" className="flex items-center gap-2 px-6 py-6">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
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
                  ? 'bg-paper-card text-text-hi'
                  : 'text-text-lo hover:bg-paper-card/60 hover:text-text-hi'
              }`
            }
          >
            <Icon size={17} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mx-3 mb-3 rounded-xl border border-line bg-paper-card p-4">
        <p className="font-mono text-xs text-text-faint">Balance</p>
        <p className="mt-1 font-display text-lg font-semibold text-brand">
          {formatNaira(coins)}
        </p>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mx-3 mb-6 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-text-lo transition hover:bg-stake-dim/40 hover:text-stake"
      >
        <LogOut size={17} strokeWidth={2} />
        Log out
      </button>
    </aside>
  )
}
