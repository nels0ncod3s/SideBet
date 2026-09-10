const KEY = 'sidebet_pools'

export function getCreatedPools() {
  try {
    const pools = JSON.parse(localStorage.getItem(KEY) ?? '[]')
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
  localStorage.setItem(KEY, JSON.stringify([pool, ...getCreatedPools()]))
  return pool
}
