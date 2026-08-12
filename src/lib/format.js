export function formatNaira(amount) {
  const n = amount ?? 0
  return `₦${n.toLocaleString('en-NG')}`
}
