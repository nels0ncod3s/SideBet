import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import FormField from '../components/auth/FormField'
import { createSession } from '../lib/mockAuth'

export default function Signup() {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const name = e.target.elements.name?.value
    const email = e.target.elements.email?.value
    createSession({ name: name || 'You', phone: email })
    navigate('/dashboard')
  }

  return (
    <AuthLayout
      eyebrow="Get started"
      title="Create your account"
      subtitle="You'll start with 1,000 free coins to stake."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-coin hover:brightness-110">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          label="Display name"
          name="name"
          placeholder="What your friends will see"
          autoComplete="nickname"
          required
        />
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
          placeholder="At least 8 characters"
          autoComplete="new-password"
          required
        />

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-coin py-3 text-sm font-semibold text-ink transition hover:brightness-110"
        >
          Create account
        </button>

        <p className="text-center text-xs text-text-faint">
          By continuing you agree Coins have no cash value and can't be
          bought, sold, or withdrawn.
        </p>
      </form>
    </AuthLayout>
  )
}
