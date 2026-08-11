import { useOutletContext } from 'react-router-dom'
import StatCard from '../../components/dashboard/StatCard'
import BetRow from '../../components/dashboard/BetRow'

const activeBets = [
  { title: 'Arsenal vs Chelsea', pool: '25,000', yes: 64 },
  { title: 'Rain in Lagos today', pool: '10,000', yes: 20 },
  { title: 'Osimhen scores before halftime', pool: '3,120', yes: 71 },
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
          value={`${(session?.coins ?? 0).toLocaleString()} coins`}
          accent="coin"
        />
        <StatCard label="Total won" value="12,000 coins" accent="coin" />
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold text-text-hi">
          Active bets
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {activeBets.map((b) => (
            <BetRow key={b.title} {...b} />
          ))}
        </div>
      </div>
    </div>
  )
}
