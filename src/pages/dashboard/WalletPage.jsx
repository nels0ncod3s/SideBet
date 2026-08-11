import { useOutletContext } from 'react-router-dom'

const transactions = [
  { label: 'Staked — Arsenal vs Chelsea', amount: -500, time: '2h ago' },
  { label: 'Won — Osimhen scores', amount: +1200, time: '1d ago' },
  { label: 'Staked — Rain in Lagos today', amount: -100, time: '2d ago' },
  { label: 'Daily bonus', amount: +50, time: '2d ago' },
  { label: 'Lost — Owambe rain bet', amount: -260, time: '4d ago' },
]

export default function WalletPage() {
  const { session } = useOutletContext()

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        Wallet
      </h1>
      <p className="mt-1 text-sm text-text-lo">
        Track your coins. Remember — no cash value, no withdrawals.
      </p>

      <div className="mt-6 rounded-2xl border border-ink-border bg-ink-raised p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-text-faint">
          Balance
        </p>
        <p className="mt-2 font-display text-4xl font-semibold text-coin">
          {(session?.coins ?? 0).toLocaleString()}{' '}
          <span className="text-lg font-normal text-text-lo">coins</span>
        </p>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold text-text-hi">
          Recent activity
        </h2>
        <div className="mt-4 divide-y divide-ink-border overflow-hidden rounded-2xl border border-ink-border">
          {transactions.map((t) => (
            <div
              key={t.label}
              className="flex items-center justify-between bg-ink-raised px-4 py-3.5"
            >
              <div>
                <p className="text-sm text-text-hi">{t.label}</p>
                <p className="font-mono text-xs text-text-faint">{t.time}</p>
              </div>
              <span
                className={`font-mono text-sm ${
                  t.amount > 0 ? 'text-coin' : 'text-stake'
                }`}
              >
                {t.amount > 0 ? '+' : ''}
                {t.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
