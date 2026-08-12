import { Link, useOutletContext } from 'react-router-dom'
import { CirclePlus, TrendingUp, Dice5 } from 'lucide-react'
import StatCard from '../../components/dashboard/StatCard'
import BetRow from '../../components/dashboard/BetRow'
import EmptyState from '../../components/dashboard/EmptyState'
import { formatNaira } from '../../lib/currency'

const activeBets = [
  { title: 'Arsenal vs Chelsea', pool: '25,000', yes: 64 },
  { title: 'Rain in Lagos today', pool: '10,000', yes: 20 },
  { title: 'Osimhen scores before halftime', pool: '3,120', yes: 71 },
]

const recentActivity = [
  { label: 'Won — Osimhen scores', time: '1d ago' },
  { label: 'Staked — Rain in Lagos today', time: '2d ago' },
  { label: 'Daily bonus claimed', time: '2d ago' },
]

export default function Overview() {
  const { session } = useOutletContext()

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        Overview
      </h1>
      <p className="mt-1 text-sm text-text-lo">
        Welcome back{session?.name ? `, ${session.name}` : ''}. Here's what's
        happening across your pools.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Active pools" value="3 pending" />
        <StatCard
          label="Wallet balance"
          value={formatNaira(session?.coins)}
          accent="brand"
        />
        <StatCard label="Total won" value={formatNaira(12000)} accent="win" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <h2 className="font-display text-lg font-semibold text-text-hi">
            Active bets
          </h2>
          {activeBets.length === 0 ? (
            <div className="mt-4">
              <EmptyState
                icon={Dice5}
                title="No active bets"
                subtitle="Pools you stake in will show up here while they're live."
                actionLabel="Start a pool"
                actionTo="/dashboard/create"
              />
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              {activeBets.map((b) => (
                <BetRow key={b.title} {...b} />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <Link
            to="/dashboard/create"
            className="flex items-center gap-3 rounded-2xl border border-line bg-paper-raised p-4 transition hover:border-brand/40"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-dim/50 text-brand">
              <CirclePlus size={18} strokeWidth={2} />
            </span>
            <div>
              <p className="text-sm font-medium text-text-hi">
                Start a new pool
              </p>
              <p className="text-xs text-text-lo">Any hot take works</p>
            </div>
          </Link>

          <div className="rounded-2xl border border-line bg-paper-raised p-5">
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className="text-win" strokeWidth={2} />
              <p className="font-mono text-xs uppercase tracking-widest text-text-faint">
                Recent activity
              </p>
            </div>
            <div className="mt-3 flex flex-col divide-y divide-line">
              {recentActivity.length === 0 ? (
                <p className="py-3 text-xs text-text-lo">
                  No activity yet — your bets and bonuses will land here.
                </p>
              ) : (
                recentActivity.map((a) => (
                  <div key={a.label} className="flex flex-col py-3 first:pt-0 last:pb-0">
                    <span className="text-sm text-text-hi">{a.label}</span>
                    <span className="mt-0.5 text-xs text-text-faint">
                      {a.time}
                    </span>
                  </div>
                ))
              )}
            </div>
            <Link
              to="/dashboard/wallet"
              className="mt-1 inline-block text-xs font-medium text-brand"
            >
              View all activity →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
