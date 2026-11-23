import { useState, type FormEvent } from 'react'
import { submitDemoRequest } from '@/api/demoRequest'

export const INTEREST_OPTIONS = [
  { id: 'asset_discovery', label: 'Asset discovery & inventory' },
  { id: 'vuln_scanning', label: 'Vulnerability scanning' },
  { id: 'container_scanning', label: 'Container image scanning' },
  { id: 'compliance_patch', label: 'Compliance & patch tracking' },
  { id: 'reports_dashboards', label: 'Reports & dashboards' },
] as const

export type InterestId = (typeof INTEREST_OPTIONS)[number]['id']

// Must match the backend's SubmitDemoRequestRequest.EnvironmentSize regex exactly, en dashes
// included — anything else fails validation server-side.
export const ENVIRONMENT_SIZE_OPTIONS = ['Under 100 devices', '100 – 500 devices', '500 – 2,000 devices', '2,000+ devices', 'Not sure yet'] as const

type FormState = {
  fullName: string
  workEmail: string
  company: string
  jobTitle: string
  phone: string
  environmentSize: string
  interests: Set<InterestId>
  preferredDate: string
  notes: string
  /** Honeypot — must stay empty. Never shown to real users. */
  website: string
}

const INITIAL_STATE: FormState = {
  fullName: '',
  workEmail: '',
  company: '',
  jobTitle: '',
  phone: '',
  environmentSize: '',
  interests: new Set(),
  preferredDate: '',
  notes: '',
  website: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9+()\-.\s]{7,20}$/

export type DemoFormStatus = 'idle' | 'submitting' | 'success'

export const STEPS = ['name', 'email', 'company', 'environment', 'interests', 'date', 'wrapup'] as const
export type StepId = (typeof STEPS)[number]

export function useDemoForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [step, setStep] = useState(0)
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<DemoFormStatus>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleInterest(id: InterestId) {
    setForm((prev) => {
      const next = new Set(prev.interests)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return { ...prev, interests: next }
    })
  }

  const errors = {
    fullName: form.fullName.trim() ? null : 'Enter your full name.',
    workEmail: !form.workEmail.trim() ? 'Enter your work email.' : !EMAIL_PATTERN.test(form.workEmail) ? 'Enter a valid email address.' : null,
    company: form.company.trim() ? null : 'Enter your company name.',
    phone: form.phone.trim() && !PHONE_PATTERN.test(form.phone) ? 'Use digits, spaces, +, (, ), - or . only.' : null,
  }

  const stepId = STEPS[step]
  const isLastStep = step === STEPS.length - 1

  const canContinue =
    stepId === 'name'
      ? !errors.fullName
      : stepId === 'email'
        ? !errors.workEmail
        : stepId === 'company'
          ? !errors.company
          : stepId === 'wrapup'
            ? !errors.phone
            : true

  async function doSubmit() {
    setSubmitError(null)
    setStatus('submitting')
    try {
      await submitDemoRequest({
        name: form.fullName.trim(),
        email: form.workEmail.trim(),
        company: form.company.trim(),
        jobTitle: form.jobTitle.trim() || undefined,
        phone: form.phone.trim() || undefined,
        environmentSize: form.environmentSize || undefined,
        interests: INTEREST_OPTIONS.filter((opt) => form.interests.has(opt.id)).map((opt) => opt.label),
        preferredDate: form.preferredDate || undefined,
        message: form.notes.trim() || undefined,
        website: form.website,
      })
      setStatus('success')
    } catch (err) {
      setStatus('idle')
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong sending your request. Please try again.')
    }
  }

  function handleStepSubmit(e: FormEvent) {
    e.preventDefault()
    if (!canContinue) {
      setAttempted(true)
      return
    }
    if (isLastStep) {
      void doSubmit()
      return
    }
    setAttempted(false)
    setStep((s) => s + 1)
  }

  function goBack() {
    setAttempted(false)
    setSubmitError(null)
    setStep((s) => Math.max(0, s - 1))
  }

  function reset() {
    setForm(INITIAL_STATE)
    setStep(0)
    setAttempted(false)
    setSubmitError(null)
    setStatus('idle')
  }

  return {
    form,
    set,
    toggleInterest,
    errors,
    attempted,
    status,
    submitError,
    step,
    stepId,
    totalSteps: STEPS.length,
    isLastStep,
    canContinue,
    handleStepSubmit,
    goBack,
    reset,
  }
}
