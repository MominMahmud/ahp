# AHP IT Navigator — Marketing Site

A standalone three-page marketing/demo-request site for AHP IT Navigator: Home, Request a Demo, and Login. Separate from and unrelated to the SentinelOneView app's own codebase/repo.

## Pages

- `/` — Home: hero, value props, how-it-works, closing CTA.
- `/request-demo` — Demo request form (full name, work email, company, job title, phone, environment size, interests, preferred date, notes). Matches the referenced `ahpnavigator.com/request-demo` layout.
- `/login` — Login form UI. Submitting redirects to the real AHP IT Navigator app login.

Every page shares a top navbar (Home / Request a Demo / Login) with a "Back to Al Hilal Website" link on the right.

## Things to fill in before shipping

- **`src/siteConfig.ts`**
  - `ORIGIN_SITE_URL` is a placeholder (`'#'`). Set it to the real Al Hilal website URL.
  - `APP_LOGIN_URL` is set to `https://ahpnavigator.com/` — update if the real app's login route differs.
- **Request-demo form submission**: `src/pages/RequestDemo/useDemoForm.ts` currently simulates submission (a timeout, no network call) since this site has no backend of its own. Wire `submit()` up to a real endpoint (an email relay, CRM webhook, or an API route) before relying on it to capture leads.

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
npm run lint     # oxlint
```
