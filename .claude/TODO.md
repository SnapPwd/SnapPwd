# TODO

## Open

### Create comparison pages vs competitors
- **Created:** 2026-01-24
- **Last Updated:** 2026-01-24
- **Description:** Build pSEO comparison pages targeting "SnapPwd vs X" search queries. Create pages comparing SnapPwd to: 1Password sharing, Bitwarden Send, and OneTimeSecret. Each page should highlight SnapPwd's differentiators (no account required, zero-knowledge, self-destructing links) with a fair comparison table, unique benefits section, and clear CTAs. High conversion intent keywords.
- **Pattern:** `/compare/[competitor]` or `/vs/[competitor]`
- **Pages:** `snappwd-vs-1password`, `snappwd-vs-bitwarden-send`, `snappwd-vs-onetimesecret`

---

## Closed

### Create pSEO pages for Stripe and Supabase API key sharing
- **Created:** 2026-01-24
- **Closed:** 2026-01-24
- **Description:** Added programmatic SEO pages for Stripe (payment) and Supabase (backend-as-a-service) API key sharing. Extended existing `lib/llm-providers.ts` with unique content for each service. Updated hub page to organize providers into "AI & LLM" and "Service & Infrastructure" categories. (Redis removed - it uses passwords/connection strings, not API keys.)
- **Files:** `lib/llm-providers.ts`, `app/api-keys/page.tsx`, `app/sitemap.ts`

### Consolidate SecretInput password config handlers
- **Created:** 2026-01-24
- **Closed:** 2026-01-24
- **Description:** The SecretInput component has 5 separate `useCallback` handlers for password config checkboxes (`handleUppercaseChange`, `handleLowercaseChange`, `handleNumbersChange`, `handleSymbolsChange`, `handleLengthChange`). These can be replaced with a single generic handler, reducing approximately 50 lines of code.
- **File:** `components/ui/SecretInput/SecretInput.tsx`

### Consolidate Copy Button implementations
- **Created:** 2026-01-24
- **Closed:** 2026-01-24
- **Description:** Multiple copy-to-clipboard button implementations exist across the codebase. The existing `CopyButton` component should be enhanced to accept variant/size props and used consistently instead of inline implementations.
- **Files:** `components/ui/CopyButton/CopyButton.tsx`, `components/ui/SecretInput/SecretInput.tsx`, `components/ui/SecretLinkResult/SecretLinkResult.tsx`

### Extract date validation helper in date-time-picker
- **Created:** 2026-01-24
- **Closed:** 2026-01-24
- **Description:** The same date boundary validation logic is repeated twice in the date-time-picker component. Extract to a `clampDate` helper function for clarity.
- **File:** `components/ui/date-time-picker.tsx`

### Simplify timezone offset function
- **Created:** 2026-01-24
- **Closed:** 2026-01-24
- **Description:** The `getTimezoneOffset` function in date-time-picker uses unnecessarily complex ternary logic that can be simplified.
- **File:** `components/ui/date-time-picker.tsx`

### Use consistent function declaration style
- **Created:** 2026-01-24
- **Closed:** 2026-01-24
- **Description:** The codebase has mixed use of arrow functions and `function` keyword. Per project standards, `function` keyword should be preferred for standalone functions.
- **Files:** `components/icons/Logo.tsx`, `components/icons/GitHub.tsx`
