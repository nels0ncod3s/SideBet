const KEY = 'sidebet_session'

export function getSession() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function createSession({ email, phone, name }) {
  const session = {
    name: name || 'You',
    email: email ?? phone,
    coins: 1000,
    joinedAt: Date.now(),
  }
  localStorage.setItem(KEY, JSON.stringify(session))
  return session
}

export function clearSession() {
  localStorage.removeItem(KEY)
}

export function addCoins(amount) {
  const session = getSession()
  if (!session) return null
  const updated = { ...session, coins: (session.coins ?? 0) + amount }
  localStorage.setItem(KEY, JSON.stringify(updated))
  return updated
}

export function updateSession(changes) {
  const session = getSession()
  if (!session) return null
  const updated = { ...session, ...changes }
  localStorage.setItem(KEY, JSON.stringify(updated))
  return updated
}
