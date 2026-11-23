const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5247/api/v1'

export type SubmitDemoRequestPayload = {
  name: string
  email: string
  company: string
  jobTitle?: string
  phone?: string
  environmentSize?: string
  interests?: string[]
  preferredDate?: string
  message?: string
  /** Honeypot — must stay empty. A real visitor never sees or fills this field. */
  website?: string
}

type ApiResponse<T> = {
  isSuccessful: boolean
  errorMessage?: string | null
  data: T | null
}

type SubmitDemoRequestResponse = { message: string }

export async function submitDemoRequest(payload: SubmitDemoRequestPayload): Promise<SubmitDemoRequestResponse> {
  const response = await fetch(`${API_BASE_URL}/demo-requests/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const body = (await response.json().catch(() => null)) as ApiResponse<SubmitDemoRequestResponse> | null

  if (!response.ok || !body?.isSuccessful) {
    throw new Error(body?.errorMessage || 'Something went wrong sending your request. Please try again.')
  }

  return body.data ?? { message: 'Request received.' }
}
