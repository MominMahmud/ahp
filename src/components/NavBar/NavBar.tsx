import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getBackNavTarget } from '@/siteConfig'
import styles from './NavBar.module.css'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/request-demo', label: 'Request a Demo' },
  { to: '/login', label: 'Login' },
]

function BackArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function NavBar() {
  const [backTarget] = useState(getBackNavTarget)

  return (
    <header className={styles.bar}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand} aria-label="AHP IT Navigator home">
          <span className={styles.mark} aria-hidden="true">
            AH
          </span>
          <span className={styles.wordmark}>AHP IT Navigator</span>
        </NavLink>

        <nav className={styles.links} aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => styles.link + (isActive ? ` ${styles.linkActive}` : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {backTarget.kind === 'link' ? (
          <a href={backTarget.url} className={styles.back}>
            <BackArrow />
            <span>Back to {backTarget.label}</span>
          </a>
        ) : (
          <button type="button" className={styles.back} onClick={() => window.history.back()}>
            <BackArrow />
            <span>Back</span>
          </button>
        )}
      </div>
    </header>
  )
}
