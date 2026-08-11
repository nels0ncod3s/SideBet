import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import { getSession } from '../../lib/mockAuth'

export default function DashboardLayout() {
  const session = getSession()

  return (
    <div className="flex min-h-screen bg-ink">
      <Sidebar coins={session?.coins} />

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-ink-border/60 px-5 py-4 md:px-8">
          <div className="flex items-center gap-2 md:hidden">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-coin text-sm font-bold text-ink">
              S
            </span>
            <span className="font-display text-base font-semibold">
              SideBet
            </span>
          </div>
          <div className="hidden md:block" />

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-ink-border bg-ink-raised px-3 py-1.5 font-mono text-xs text-coin">
              {(session?.coins ?? 0).toLocaleString()} coins
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
