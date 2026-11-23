import type { ReactNode } from 'react'
import { VALUE_PROPS } from '@/content/valueProps'
import { DateChipPicker } from './DateChipPicker'
import { ENVIRONMENT_SIZE_OPTIONS, INTEREST_OPTIONS, STEPS, useDemoForm } from './useDemoForm'
import styles from './RequestDemo.module.css'

const FOOTER_STEPS = [
  { n: '01', label: 'Send the form' },
  { n: '02', label: 'We reach out to pick a time' },
  { n: '03', label: 'Live walkthrough' },
] as const

const STEP_COPY: Record<(typeof STEPS)[number], { title: string; subtitle: string }> = {
  name: { title: "What's your name?", subtitle: "So we know who we're talking to." },
  email: { title: "What's your work email?", subtitle: "We'll send the confirmation here." },
  company: { title: 'Where do you work?', subtitle: "Company name, and your role if you don't mind." },
  environment: { title: 'How big is your environment?', subtitle: 'Roughly — this just helps us tailor the walkthrough.' },
  interests: { title: 'What would you like to see?', subtitle: 'Pick as many as you like.' },
  date: { title: 'When works best for you?', subtitle: "Pick a day — we'll follow up to lock in a time." },
  wrapup: { title: 'Anything else?', subtitle: 'Phone number and notes are both optional.' },
}

export function RequestDemo() {
  const demo = useDemoForm()
  const { form, set, toggleInterest, errors, attempted, status, step, stepId, totalSteps, isLastStep, handleStepSubmit, goBack, reset } = demo
  const copy = STEP_COPY[stepId]

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
            {FOOTER_STEPS.map((s, i) => (
              <li key={s.n} className={styles.step}>
                <span className={styles.stepNum}>{s.n}</span>
                <span>{s.label}</span>
                {i < FOOTER_STEPS.length - 1 ? <span className={styles.stepDivider} aria-hidden="true" /> : null}
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
              <form onSubmit={handleStepSubmit} noValidate>
                <div className={styles.progressRow}>
                  {step > 0 ? (
                    <button type="button" className={styles.backChevron} onClick={goBack} aria-label="Previous question">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ) : (
                    <span />
                  )}
                  <span className={styles.progressTrack}>
                    <span className={styles.progressFill} style={{ width: `${((step + 1) / totalSteps) * 100}%` }} />
                  </span>
                  <span className={styles.progressLabel}>
                    {step + 1} / {totalSteps}
                  </span>
                </div>

                <h2 className={styles.stepTitle}>{copy.title}</h2>
                <p className={styles.stepSubtitle}>{copy.subtitle}</p>

                <div className={styles.stepBody}>
                  {stepId === 'name' ? (
                    <>
                      <input
                        key="name"
                        autoFocus
                        className={styles.heroInput}
                        value={form.fullName}
                        onChange={(e) => set('fullName', e.target.value)}
                        placeholder="Jane Doe"
                        aria-label="Full name"
                      />
                      {attempted && errors.fullName ? <span className={styles.error}>{errors.fullName}</span> : null}
                    </>
                  ) : null}

                  {stepId === 'email' ? (
                    <>
                      <input
                        key="email"
                        autoFocus
                        type="email"
                        className={styles.heroInput}
                        value={form.workEmail}
                        onChange={(e) => set('workEmail', e.target.value)}
                        placeholder="you@company.com"
                        aria-label="Work email"
                      />
                      {attempted && errors.workEmail ? <span className={styles.error}>{errors.workEmail}</span> : null}
                    </>
                  ) : null}

                  {stepId === 'company' ? (
                    <>
                      <input
                        key="company"
                        autoFocus
                        className={styles.heroInput}
                        value={form.company}
                        onChange={(e) => set('company', e.target.value)}
                        placeholder="Acme Corp"
                        aria-label="Company"
                      />
                      {attempted && errors.company ? <span className={styles.error}>{errors.company}</span> : null}
                      <SecondaryField label="Job title (optional)">
                        <input value={form.jobTitle} onChange={(e) => set('jobTitle', e.target.value)} placeholder="IT Manager" />
                      </SecondaryField>
                    </>
                  ) : null}

                  {stepId === 'environment' ? (
                    <div className={styles.chipGrid}>
                      {ENVIRONMENT_SIZE_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={styles.pickChip}
                          data-selected={form.environmentSize === opt}
                          onClick={() => set('environmentSize', opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {stepId === 'interests' ? (
                    <div className={styles.cardList}>
                      {INTEREST_OPTIONS.map((opt) => (
                        <label key={opt.id} className={styles.optionCard} data-selected={form.interests.has(opt.id)}>
                          <input type="checkbox" checked={form.interests.has(opt.id)} onChange={() => toggleInterest(opt.id)} />
                          <span className={styles.optionCardCheck} aria-hidden="true" />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  ) : null}

                  {stepId === 'date' ? <DateChipPicker value={form.preferredDate} onChange={(iso) => set('preferredDate', iso)} /> : null}

                  {stepId === 'wrapup' ? (
                    <>
                      <SecondaryField label="Phone (optional)">
                        <input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="Optional" />
                      </SecondaryField>
                      <SecondaryField label="Anything we should know? (optional)">
                        <textarea
                          rows={3}
                          value={form.notes}
                          onChange={(e) => set('notes', e.target.value)}
                          placeholder="Your current tools, what you want to fix, questions…"
                        />
                      </SecondaryField>
                    </>
                  ) : null}
                </div>

                <button type="submit" className={styles.submitButton} disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending…' : isLastStep ? 'Request my demo' : 'Continue'}
                </button>
                {step === 0 ? <p className={styles.fineprint}>We only use your details to arrange the demo.</p> : null}
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function SecondaryField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      {children}
    </label>
  )
}
