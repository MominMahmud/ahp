import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getBackNavTarget } from '@/siteConfig'
import styles from './Footer.module.css'

export function Footer() {
  const [backTarget] = useState(getBackNavTarget)

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <span className={styles.wordmark}>AHP IT Navigator</span>
          <p className={styles.tagline}>Discovery, vulnerability scanning and compliance tracking, in one place.</p>
        </div>

        <nav className={styles.links} aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/request-demo">Request a Demo</Link>
          <Link to="/login">Login</Link>
          {backTarget.kind === 'link' ? <a href={backTarget.url}>{backTarget.label}</a> : null}
        </nav>
      </div>
    </footer>
  )
}
