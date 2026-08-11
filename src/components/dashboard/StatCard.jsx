export default function StatCard({ label, value, accent = 'text-hi' }) {
  const accentClass =
    accent === 'coin' ? 'text-coin' : accent === 'stake' ? 'text-stake' : 'text-text-hi'

  return (
    <div className="rounded-2xl border border-ink-border bg-ink-raised p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-text-faint">
        {label}
      </p>
      <p className={`mt-2 font-display text-2xl font-semibold ${accentClass}`}>
        {value}
      </p>
    </div>
  )
}
