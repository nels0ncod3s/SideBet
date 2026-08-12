import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import { getSession } from '../../lib/mockAuth'
import { formatNaira } from '../../lib/currency'

export default function DashboardLayout() {
  const session = getSession()

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar coins={session?.coins} />

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-line/60 px-5 py-4 md:px-8">
          <div className="flex items-center gap-2 md:hidden">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
              S
            </span>
            <span className="font-display text-base font-semibold">
              SideBet
            </span>
          </div>
          <div className="hidden md:block" />

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-line bg-paper-raised px-3 py-1.5 font-mono text-xs text-brand">
              {formatNaira(session?.coins)}
            </span>
            <span className="h-8 w-8 rounded-full bg-stake" aria-hidden="true" />
          </div>
        </header>

        <main className="flex-1 px-5 pb-24 pt-6 md:px-8 md:pb-10">
          <Outlet context={{ session }} />
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
