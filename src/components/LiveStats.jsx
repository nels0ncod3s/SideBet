const stats = [
  { value: '₦18,400+', label: 'staked this week' },
  { value: '640', label: 'pools live right now' },
  { value: '92%', label: 'settled within an hour' },
]

export default function LiveStats() {
  return (
    <section className="border-y border-line/60 bg-paper-raised/50">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-line/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((s) => (
          <div key={s.label} className="px-6 py-8 text-center">
            <p className="font-display text-3xl font-semibold text-brand">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-text-lo">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
