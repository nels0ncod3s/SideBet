import { motion } from 'framer-motion'
import { Trophy, X, Radio } from 'lucide-react'
import { formatNaira } from '../../lib/currency'

const outcomeMeta = {
  live: {
    label: 'Live',
    icon: Radio,
    badge: 'bg-brand-dim/40 text-brand',
    border: 'border-line',
  },
  won: {
    label: 'Won',
    icon: Trophy,
    badge: 'bg-win-dim text-win',
    border: 'border-win/30',
  },
  lost: {
    label: 'Lost',
    icon: X,
    badge: 'bg-stake-dim text-stake',
    border: 'border-stake/30',
  },
}

export default function BetCard({
  title,
  category,
  pool,
  yes,
  myStake,
  outcome = 'live',
  payout,
  index = 0,
}) {
  const no = 100 - yes
  const meta = outcomeMeta[outcome]
  const OutcomeIcon = meta.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className={`rounded-2xl border bg-paper-raised p-4 shadow-sm shadow-black/[0.02] transition-shadow hover:shadow-md sm:p-5 ${meta.border}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <span className="font-mono text-[11px] text-stake">{category}</span>
          <p className="mt-0.5 font-display text-base font-medium text-text-hi sm:text-lg">
            {title}
          </p>
        </div>
        <span
          className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[11px] ${meta.badge}`}
        >
          <OutcomeIcon size={11} strokeWidth={2.5} />
          {meta.label}
        </span>
      </div>

      <p className="mt-2 font-mono text-xs text-text-lo">
        Pool: {formatNaira(pool)} · Your stake: {formatNaira(myStake)}
      </p>

      <div className="mt-3 flex items-center justify-between font-mono text-xs">
        <span className="text-brand">YES · {yes}%</span>
        <span className="text-stake">NO · {no}%</span>
      </div>
      <div className="mt-1.5 flex h-2 overflow-hidden rounded-full bg-line">
        <span className="h-full bg-brand" style={{ width: `${yes}%` }} />
        <span className="h-full bg-stake" style={{ width: `${no}%` }} />
      </div>

      {outcome !== 'live' && (
        <div
          className={`mt-3 rounded-lg px-3 py-2 text-xs font-medium ${
            outcome === 'won'
              ? 'bg-win-dim text-win'
              : 'bg-stake-dim text-stake'
          }`}
        >
          {outcome === 'won'
            ? `+${formatNaira(payout)} settled to your balance`
            : `−${formatNaira(payout)} settled from your balance`}
        </div>
      )}
    </motion.div>
  )
}
