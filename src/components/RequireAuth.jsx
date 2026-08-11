import { Navigate } from 'react-router-dom'
import { getSession } from '../lib/mockAuth'

export default function RequireAuth({ children }) {
  const session = getSession()
  if (!session) {
    return <Navigate to="/login" replace />
  }
  return children
}
