const KEY = 'sidebet_session'

export function getSession() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function createSession({ phone, name }) {
  const session = {
    name: name || 'You',
    phone,
    coins: 2500,
    joinedAt: Date.now(),
  }
  localStorage.setItem(KEY, JSON.stringify(session))
  return session
}

export function clearSession() {
  localStorage.removeItem(KEY)
}
