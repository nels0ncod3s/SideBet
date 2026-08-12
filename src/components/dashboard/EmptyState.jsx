import { Link } from 'react-router-dom'

export default function EmptyState({ icon: Icon, title, subtitle, actionLabel, actionTo }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-paper-card px-6 py-10 text-center">
      {Icon && (
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper-raised text-text-faint">
          <Icon size={20} strokeWidth={1.75} />
        </span>
      )}
      <p className="mt-3 text-sm font-medium text-text-hi">{title}</p>
      {subtitle && (
        <p className="mt-1 max-w-xs text-xs text-text-lo">{subtitle}</p>
      )}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-4 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
