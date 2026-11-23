import { useState, type FormEvent } from 'react'

export const INTEREST_OPTIONS = [
  { id: 'asset_discovery', label: 'Asset discovery & inventory' },
  { id: 'vuln_scanning', label: 'Vulnerability scanning' },
  { id: 'container_scanning', label: 'Container image scanning' },
  { id: 'compliance_patch', label: 'Compliance & patch tracking' },
  { id: 'reports_dashboards', label: 'Reports & dashboards' },
] as const

export type InterestId = (typeof INTEREST_OPTIONS)[number]['id']

export const ENVIRONMENT_SIZE_OPTIONS = ['1–50 devices', '51–250 devices', '251–1,000 devices', '1,000+ devices'] as const

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
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type DemoFormStatus = 'idle' | 'submitting' | 'success'

export const STEPS = ['name', 'email', 'company', 'environment', 'interests', 'date', 'wrapup'] as const
export type StepId = (typeof STEPS)[number]

export function useDemoForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [step, setStep] = useState(0)
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<DemoFormStatus>('idle')

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
  }

  const stepId = STEPS[step]
  const isLastStep = step === STEPS.length - 1

  const canContinue =
    stepId === 'name' ? !errors.fullName : stepId === 'email' ? !errors.workEmail : stepId === 'company' ? !errors.company : true

  async function doSubmit() {
    setStatus('submitting')
    // No backend exists for this marketing site yet — this simulates submission.
    // Wire this up to a real endpoint (e.g. email relay or CRM webhook) before going live.
    await new Promise((resolve) => setTimeout(resolve, 650))
    setStatus('success')
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
    setStep((s) => Math.max(0, s - 1))
  }

  function reset() {
    setForm(INITIAL_STATE)
    setStep(0)
    setAttempted(false)
    setStatus('idle')
  }

  return {
    form,
    set,
    toggleInterest,
    errors,
    attempted,
    status,
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
