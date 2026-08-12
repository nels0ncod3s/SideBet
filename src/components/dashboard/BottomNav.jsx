import { NavLink } from 'react-router-dom'
import { navItems } from './navItems'

export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex border-t border-line/70 bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      aria-label="Primary"
    >
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] ${
              isActive ? 'text-brand' : 'text-text-faint'
            }`
          }
        >
          <Icon size={20} strokeWidth={2} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
