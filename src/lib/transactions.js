import { getSession } from './mockAuth.js'

function storageKey() {
  return `sidebet_transactions:${getSession()?.email ?? 'guest'}`
}

export function getTransactions() {
  try {
    const transactions = JSON.parse(localStorage.getItem(storageKey()) ?? '[]')
    return Array.isArray(transactions) ? transactions : []
  } catch {
    return []
  }
}

export function addTransaction({ label, amount, type }) {
  const transaction = {
    id: crypto.randomUUID(),
    label,
    amount,
    type,
    createdAt: Date.now(),
  }
  localStorage.setItem(
    storageKey(),
    JSON.stringify([transaction, ...getTransactions()]),
  )
  return transaction
}
