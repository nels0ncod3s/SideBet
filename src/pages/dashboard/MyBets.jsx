import { useState } from 'react'
import { Dice5 } from 'lucide-react'
import BetCard from '../../components/dashboard/BetCard'
import EmptyState from '../../components/dashboard/EmptyState'

const bets = [
  { title: 'Arsenal vs Chelsea', category: 'Sports', pool: 25000, yes: 64, myStake: 500, outcome: 'live' },
  { title: 'Rain in Lagos today', category: 'Weather', pool: 10000, yes: 20, myStake: 100, outcome: 'live' },
  { title: 'Osimhen scores before halftime', category: 'Sports', pool: 3120, yes: 71, myStake: 250, outcome: 'live' },
  { title: 'Who gets evicted from BBN this Sunday?', category: 'Pop culture', pool: 2050, yes: 48, myStake: 200, outcome: 'live' },
  { title: 'Does Tayo show up on time?', category: 'Friend group', pool: 480, yes: 35, myStake: 100, outcome: 'won', payout: 1200 },
  { title: 'Rain before the owambe ends', category: 'Weather', pool: 260, yes: 58, myStake: 260, outcome: 'lost', payout: 260 },
]

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'live', label: 'Live' },
  { key: 'won', label: 'Won' },
  { key: 'lost', label: 'Lost' },
]

export default function MyBets() {
  const [tab, setTab] = useState('all')
  const filtered = tab === 'all' ? bets : bets.filter((b) => b.outcome === tab)

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        My Bets
      </h1>
      <p className="mt-1 text-sm text-text-lo">
        Every pool you've staked in, live and settled.
      </p>

      <div className="mt-5 flex gap-1.5 overflow-x-auto">
        {tabs.map((t) => {
          const count =
            t.key === 'all' ? bets.length : bets.filter((b) => b.outcome === t.key).length
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
            title={`No ${tab === 'all' ? '' : tab} bets yet`}
            subtitle="Once you stake in a pool, it'll show up here."
            actionLabel="Start a pool"
            actionTo="/dashboard/create"
          />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {filtered.map((b, i) => (
            <BetCard key={b.title} {...b} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
