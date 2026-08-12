export default function StatCard({ label, value, accent = 'default' }) {
  const accentClass =
    accent === 'brand'
      ? 'text-brand'
      : accent === 'win'
        ? 'text-win'
        : accent === 'stake'
          ? 'text-stake'
          : 'text-text-hi'

  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-text-faint">
        {label}
      </p>
      <p className={`mt-2 font-display text-2xl font-semibold ${accentClass}`}>
        {value}
      </p>
    </div>
  )
}
