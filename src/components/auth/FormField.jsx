export default function FormField({ label, type = 'text', placeholder, autoComplete, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-text-hi">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-ink-border bg-ink-raised px-4 py-3 text-[16px] text-text-hi placeholder:text-text-faint focus:border-coin/60 focus:outline-none"
        {...props}
      />
    </label>
  )
}
