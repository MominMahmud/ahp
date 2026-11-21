import { Link } from 'react-router-dom'
import { VALUE_PROPS } from '@/content/valueProps'
import { HOW_IT_WORKS } from './content'
import { NetworkGraphic } from './NetworkGraphic'
import styles from './Home.module.css'

export function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div>
            <p className={styles.eyebrow}>Asset & vulnerability management</p>
            <h1 className={styles.headline}>
              See your whole network. <em>Fix what matters first.</em>
            </h1>
            <p className={styles.lede}>
              AHP IT Navigator discovers every device, scores what's actually at risk, and proves compliance with reports your auditors
              will accept — without another dashboard nobody opens.
            </p>
            <div className={styles.heroActions}>
              <Link to="/request-demo" className={styles.primaryButton}>
                Request a demo
              </Link>
              <Link to="/login" className={styles.secondaryButton}>
                Sign in
              </Link>
            </div>
          </div>
          <div className={styles.heroArt}>
            <NetworkGraphic />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>One place for discovery, risk and compliance</h2>
          <div className={styles.valueGrid}>
            {VALUE_PROPS.map(({ icon: Icon, title, description }) => (
              <article key={title} className={styles.valueCard}>
                <span className={styles.valueIcon}>
                  <Icon />
                </span>
                <h3 className={styles.valueTitle}>{title}</h3>
                <p className={styles.valueDesc}>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSunken}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>How it works</h2>
          <div className={styles.stepGrid}>
            {HOW_IT_WORKS.map((step) => (
              <div key={step.n} className={styles.stepCard}>
                <span className={styles.stepNum}>{step.n}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaBand}>
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <h2 className={styles.ctaTitle}>See it on your own network.</h2>
            <p className={styles.ctaSubtitle}>30 minutes, tailored to your environment. No slides, no commitment.</p>
          </div>
          <Link to="/request-demo" className={styles.ctaButton}>
            Request a demo
          </Link>
        </div>
      </section>
    </main>
  )
}
