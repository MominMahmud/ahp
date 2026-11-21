import { useState, type FormEvent } from 'react'
import { APP_LOGIN_URL } from '@/siteConfig'
import styles from './Login.module.css'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirecting, setRedirecting] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setRedirecting(true)
    window.setTimeout(() => {
      window.location.href = APP_LOGIN_URL
    }, 500)
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <span className={styles.mark} aria-hidden="true">
          AH
        </span>
        <h1 className={styles.title}>Sign in to AHP IT Navigator</h1>
        <p className={styles.subtitle}>Use your AHP IT Navigator account to open the console.</p>

        <form onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <button type="submit" className={styles.submitButton} disabled={redirecting}>
            {redirecting ? 'Redirecting…' : 'Sign in'}
          </button>
        </form>

        <p className={styles.note}>This takes you to the live AHP IT Navigator console at {APP_LOGIN_URL}</p>
      </div>
    </main>
  )
}
