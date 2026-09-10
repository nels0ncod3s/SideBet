import { getSession } from './mockAuth.js'

function storageKey() {
  return `sidebet_pools:${getSession()?.email ?? 'guest'}`
}

export function getCreatedPools() {
  try {
    const pools = JSON.parse(localStorage.getItem(storageKey()) ?? '[]')
    return Array.isArray(pools) ? pools : []
  } catch {
    return []
  }
}

export function createPool({ question, category, stake, closesAt }) {
  const pool = {
    id: crypto.randomUUID(),
    title: question.trim(),
    category,
    pool: Number(stake),
    myStake: Number(stake),
    yes: 100,
    outcome: 'live',
    closesAt,
    createdAt: Date.now(),
  }
  localStorage.setItem(
    storageKey(),
    JSON.stringify([pool, ...getCreatedPools()]),
  )
  return pool
}
