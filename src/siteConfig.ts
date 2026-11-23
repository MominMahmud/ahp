export const APP_LOGIN_URL = 'https://ahpnavigator.com/'

// Sites this microsite is expected to be linked from. The navbar's back
// button points at whichever of these referred the visitor; anything else
// falls back to browser history (navigate back one step).
const KNOWN_ORIGINS: { hostname: string; label: string; url: string }[] = [
  { hostname: 'alhilalprojects.com', label: 'Al Hilal Projects', url: 'https://alhilalprojects.com/' },
  { hostname: 'tensorr.com', label: 'Tensorr', url: 'https://tensorr.com/' },
]

export type BackNavTarget = { kind: 'link'; label: string; url: string } | { kind: 'history' }

export function getBackNavTarget(): BackNavTarget {
  if (typeof document === 'undefined' || !document.referrer) return { kind: 'history' }

  try {
    const hostname = new URL(document.referrer).hostname.replace(/^www\./, '')
    const match = KNOWN_ORIGINS.find((origin) => origin.hostname === hostname)
    if (match) return { kind: 'link', label: match.label, url: match.url }
  } catch {
    // malformed/absent referrer — fall through to history
  }

  return { kind: 'history' }
}
