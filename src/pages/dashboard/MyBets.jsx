import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Dice5 } from 'lucide-react'
import BetCard from '../../components/dashboard/BetCard'
import EmptyState from '../../components/dashboard/EmptyState'
import { getCreatedPools } from '../../lib/pools'

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'live', label: 'Live' },
  { key: 'won', label: 'Won' },
  { key: 'lost', label: 'Lost' },
]

export default function MyBets() {
  const location = useLocation()
  const [tab, setTab] = useState('all')
  const allBets = getCreatedPools()
  const filtered = tab === 'all' ? allBets : allBets.filter((b) => b.outcome === tab)

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        My Bets
      </h1>
      <p className="mt-1 text-sm text-text-lo">
        Every pool you've staked in, live and settled.
      </p>

      {location.state?.message && (
        <div role="status" className="mt-5 rounded-xl border border-win/30 bg-win-dim px-4 py-3 text-sm font-medium text-win">
          {location.state.message}
        </div>
      )}

      <div className="mt-5 flex gap-1.5 overflow-x-auto">
        {tabs.map((t) => {
          const count =
            t.key === 'all' ? allBets.length : allBets.filter((b) => b.outcome === t.key).length
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition ${
                tab === t.key
                  ? 'border-brand bg-brand-dim/30 text-brand'
                  : 'border-line text-text-lo hover:text-text-hi'
              }`}
            >
              {t.label}
              <span
                className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] ${
                  tab === t.key ? 'bg-brand/20' : 'bg-paper-card'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={Dice5}
            title={tab === 'all' ? 'No bets yet' : `No ${tab} bets yet`}
            subtitle="Once you stake in a pool, it'll show up here."
            actionLabel="Start a pool"
            actionTo="/dashboard/create"
          />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {filtered.map((b, i) => (
            <BetCard key={b.id ?? b.title} {...b} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
