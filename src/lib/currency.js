// SideBet still runs on play money — this just formats the balance with a
// ₦ symbol instead of the word "coins" so it feels native. No real currency
// is ever moved; see the disclaimer in Footer.jsx and WalletPage.jsx.
export function formatNaira(amount) {
  const numeric =
    typeof amount === 'string' ? Number(amount.replace(/,/g, '')) : amount
  const n = Math.round(numeric ?? 0)
  return `₦${(Number.isFinite(n) ? n : 0).toLocaleString()}`
}
