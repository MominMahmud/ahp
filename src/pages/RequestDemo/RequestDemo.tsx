import type { ReactNode } from 'react'
import { VALUE_PROPS } from '@/content/valueProps'
import { CalendarIcon, ChevronIcon } from './icons'
import { ENVIRONMENT_SIZE_OPTIONS, INTEREST_OPTIONS, useDemoForm } from './useDemoForm'
import styles from './RequestDemo.module.css'

const STEPS = [
  { n: '01', label: 'Send the form' },
  { n: '02', label: 'We reach out to pick a time' },
  { n: '03', label: 'Live walkthrough' },
] as const

export function RequestDemo() {
  const { form, set, toggleInterest, errors, attempted, status, submit, reset } = useDemoForm()

  return (
    <main className={styles.page}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Schedule a demo</p>
          <h1 className={styles.headline}>
            Know what is on your network, <em>and what is at risk.</em>
          </h1>
          <p className={styles.lede}>
            A 30-minute walkthrough tailored to your environment. See discovery, vulnerability scanning and compliance tracking working
            together. No slides, no commitment.
          </p>

          <ul className={styles.features}>
            {VALUE_PROPS.map(({ icon: Icon, title, description }) => (
              <li key={title} className={styles.feature}>
                <span className={styles.featureIcon}>
                  <Icon />
                </span>
                <div>
                  <h3 className={styles.featureTitle}>{title}</h3>
                  <p className={styles.featureDesc}>{description}</p>
                </div>
              </li>
            ))}
          </ul>

          <ol className={styles.steps}>
            {STEPS.map((step, i) => (
              <li key={step.n} className={styles.step}>
                <span className={styles.stepNum}>{step.n}</span>
                <span>{step.label}</span>
                {i < STEPS.length - 1 ? <span className={styles.stepDivider} aria-hidden="true" /> : null}
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.formCol}>
          <div className={styles.card}>
            {status === 'success' ? (
              <div className={styles.success}>
                <span className={styles.successMark} aria-hidden="true">
                  ✓
                </span>
                <h2 className={styles.cardTitle}>Request sent</h2>
                <p className={styles.cardSubtitle}>
                  Thanks, {form.fullName.split(' ')[0] || 'there'}. We'll reach out within one business day to pick a time.
                </p>
                <button type="button" className={styles.secondaryButton} onClick={reset}>
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2 className={styles.cardTitle}>Request a demo</h2>
                <p className={styles.cardSubtitle}>Tell us a little about you. It takes about a minute.</p>

                <div className={styles.row2}>
                  <Field label="Full name" required error={attempted ? errors.fullName : null}>
                    <input value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Jane Doe" />
                  </Field>
                  <Field label="Work email" required error={attempted ? errors.workEmail : null}>
                    <input
                      type="email"
                      value={form.workEmail}
                      onChange={(e) => set('workEmail', e.target.value)}
                      placeholder="you@company.com"
                    />
                  </Field>
                </div>

                <div className={styles.row2}>
                  <Field label="Company" required error={attempted ? errors.company : null}>
                    <input value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Acme Corp" />
                  </Field>
                  <Field label="Job title">
                    <input value={form.jobTitle} onChange={(e) => set('jobTitle', e.target.value)} placeholder="IT Manager" />
                  </Field>
                </div>

                <div className={styles.row2}>
                  <Field label="Phone">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      placeholder="Optional"
                    />
                  </Field>
                  <Field label="Environment size">
                    <div className={styles.selectWrap}>
                      <select value={form.environmentSize} onChange={(e) => set('environmentSize', e.target.value)}>
                        <option value="">Select a range</option>
                        {ENVIRONMENT_SIZE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronIcon className={styles.selectChevron} />
                    </div>
                  </Field>
                </div>

                <fieldset className={styles.fieldset}>
                  <legend className={styles.label}>What would you like to see?</legend>
                  <div className={styles.checkGrid}>
                    {INTEREST_OPTIONS.map((opt) => (
                      <label key={opt.id} className={styles.checkOption}>
                        <input type="checkbox" checked={form.interests.has(opt.id)} onChange={() => toggleInterest(opt.id)} />
                        <span className={styles.checkBox} aria-hidden="true" />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <Field label="Preferred date">
                  <div className={styles.dateWrap}>
                    <CalendarIcon className={styles.dateIcon} />
                    <input
                      type="date"
                      value={form.preferredDate}
                      onChange={(e) => set('preferredDate', e.target.value)}
                      aria-label="Preferred date"
                    />
                    {!form.preferredDate ? <span className={styles.dateFakePlaceholder}>Pick a day that suits you</span> : null}
                  </div>
                </Field>

                <Field label="Anything we should know?">
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                    placeholder="Your current tools, what you want to fix, questions…"
                  />
                </Field>

                <button type="submit" className={styles.submitButton} disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending…' : 'Request my demo'}
                </button>
                <p className={styles.fineprint}>We only use your details to arrange the demo.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string | null
  children: ReactNode
}) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>
        {label} {required ? <span className={styles.required}>*</span> : null}
      </span>
      {children}
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  )
}
