import { formatNaira } from '../../lib/currency'

export default function BetRow({ title, pool, yes, status = 'live' }) {
  const no = 100 - yes

  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="font-display text-base font-medium text-text-hi sm:text-lg">
          {title}
        </p>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[11px] ${
            status === 'live'
              ? 'bg-brand-dim/40 text-brand'
              : 'bg-paper-card text-text-faint'
          }`}
        >
          {status === 'live' ? 'Live' : 'Settled'}
        </span>
      </div>

      <p className="mt-1 font-mono text-xs text-text-lo">
        Pool: {formatNaira(pool)}
      </p>

      <div className="mt-3 flex items-center justify-between font-mono text-xs">
        <span className="text-brand">YES · {yes}%</span>
        <span className="text-stake">NO · {no}%</span>
      </div>
      <div className="mt-1.5 flex h-2 overflow-hidden rounded-full bg-line">
        <span className="h-full bg-brand" style={{ width: `${yes}%` }} />
        <span className="h-full bg-stake" style={{ width: `${no}%` }} />
      </div>
    </div>
  )
}
