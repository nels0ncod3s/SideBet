import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import FormField from '../components/auth/FormField'
import { createSession } from '../lib/mockAuth'

export default function Login() {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // no backend yet — mock a session so the dashboard has something to gate on
    const email = e.target.elements.email?.value
    createSession({ name: email?.split('@')[0] || 'You', phone: email })
    navigate('/dashboard')
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Log in to SideBet"
      subtitle="Pick up your pools where you left off."
      footer={
        <>
          New here?{' '}
          <Link to="/signup" className="font-medium text-coin hover:brightness-110">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <FormField
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />

        <div className="flex justify-end">
          <a href="#" className="text-sm text-text-lo hover:text-text-hi">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-coin py-3 text-sm font-semibold text-ink transition hover:brightness-110"
        >
          Log in
        </button>
      </form>
    </AuthLayout>
  )
}
