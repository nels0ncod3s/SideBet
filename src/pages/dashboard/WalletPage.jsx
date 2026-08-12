import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Trophy,
  Gift,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
} from 'lucide-react'
import Modal from '../../components/Modal'
import EmptyState from '../../components/dashboard/EmptyState'
import { addCoins } from '../../lib/mockAuth'
import { formatNaira } from '../../lib/currency'

const transactions = [
  { label: 'Staked — Arsenal vs Chelsea', amount: -500, time: '2h ago', type: 'stake' },
  { label: 'Won — Osimhen scores', amount: 1200, time: '1d ago', type: 'win' },
  { label: 'Staked — Rain in Lagos today', amount: -100, time: '2d ago', type: 'stake' },
  { label: 'Daily bonus', amount: 50, time: '2d ago', type: 'bonus' },
  { label: 'Lost — Owambe rain bet', amount: -260, time: '4d ago', type: 'loss' },
]

const typeStyles = {
  stake: { icon: ArrowUpRight, iconClass: 'bg-paper-card text-text-lo' },
  win: { icon: Trophy, iconClass: 'bg-win-dim text-win' },
  loss: { icon: ArrowDownRight, iconClass: 'bg-stake-dim text-stake' },
  bonus: { icon: Gift, iconClass: 'bg-brand-dim/50 text-brand' },
}

const depositPresets = [500, 1000, 2000, 5000, 10000]

export default function WalletPage() {
  const { session } = useOutletContext()
  const navigate = useNavigate()
  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [customAmount, setCustomAmount] = useState('')

  function handleDeposit(amount) {
    if (!amount || amount <= 0) return
    addCoins(amount)
    setDepositOpen(false)
    setCustomAmount('')
    // no global state store yet, so refresh the route to pull the new balance
    navigate(0)
  }

  function closeDepositModal() {
    setDepositOpen(false)
    setCustomAmount('')
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        Wallet
      </h1>
      <p className="mt-1 text-sm text-text-lo">
        Track your balance. Remember — it's play money, no cash value.
      </p>

      <div className="mt-6 rounded-2xl border border-line bg-paper-raised p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-text-faint">
          Balance
        </p>
        <p className="mt-2 font-display text-4xl font-semibold text-brand">
          {formatNaira(session?.coins)}
        </p>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={() => setDepositOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <ArrowDownToLine size={16} strokeWidth={2.25} />
            Deposit
          </button>
          <button
            type="button"
            onClick={() => setWithdrawOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-text-hi transition hover:bg-paper-card"
          >
            <ArrowUpFromLine size={16} strokeWidth={2.25} />
            Withdraw
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold text-text-hi">
          Recent activity
        </h2>
        {transactions.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              icon={Wallet}
              title="No activity yet"
              subtitle="Deposits, stakes, and payouts will show up here."
            />
          </div>
        ) : (
          <div className="mt-4 flex flex-col divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper-raised">
            {transactions.map((t) => {
              const style = typeStyles[t.type]
              const Icon = style.icon
              return (
                <div
                  key={t.label}
                  className="flex items-center gap-3 px-4 py-3.5 sm:px-5"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.iconClass}`}
                  >
                    <Icon size={16} strokeWidth={2.25} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-text-hi">{t.label}</p>
                    <p className="mt-0.5 font-mono text-xs text-text-faint">
                      {t.time}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 font-mono text-sm font-medium ${
                      t.amount > 0 ? 'text-win' : 'text-stake'
                    }`}
                  >
                    {t.amount > 0 ? '+' : '−'}
                    {formatNaira(Math.abs(t.amount))}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <Modal
        open={depositOpen}
        onClose={closeDepositModal}
        title="Add balance"
      >
        <p className="text-sm text-text-lo">
          This is a play-money top-up — no real payment involved. Pick an
          amount to add to your balance.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {depositPresets.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => handleDeposit(amt)}
              className="rounded-xl border border-line py-3 text-sm font-semibold text-text-hi transition hover:border-brand hover:bg-brand-dim/30 hover:text-brand"
            >
              {formatNaira(amt)}
            </button>
          ))}
        </div>

        <div className="mt-4 border-t border-line pt-4">
          <label className="mb-1.5 block text-xs font-medium text-text-lo">
            Or enter a custom amount
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-text-faint">
                ₦
              </span>
              <input
                type="number"
                min="1"
                inputMode="numeric"
                placeholder="Amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full rounded-xl border border-line bg-paper-raised py-2.5 pl-7 pr-3 text-sm text-text-hi placeholder:text-text-faint focus:border-brand/60 focus:outline-none"
              />
            </div>
            <button
              type="button"
              disabled={!customAmount || Number(customAmount) <= 0}
              onClick={() => handleDeposit(Number(customAmount))}
              className="rounded-xl bg-brand px-4 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        title="Withdraw"
      >
        <p className="text-sm text-text-lo">
          SideBet is currently play-money only. Your balance can't be
          withdrawn or converted to cash — it's for bragging rights while
          we're in beta.
        </p>
        <button
          type="button"
          onClick={() => setWithdrawOpen(false)}
          className="mt-4 w-full rounded-xl bg-paper-card px-4 py-2.5 text-sm font-semibold text-text-hi transition hover:bg-line"
        >
          Got it
        </button>
      </Modal>
    </div>
  )
}
