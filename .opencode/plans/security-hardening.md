# Security Hardening Plan - Dota Wrapped

## Overview
Website blocked on VirusTotal due to weak CSP (`'unsafe-eval'`, `'unsafe-inline'`) and placeholder verification codes that trigger heuristic detection.

---

## Phase 1: Harden Content Security Policy

**File:** `next.config.mjs`

**Current (Weak):**
```javascript
"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;"
```

**New (Strict):**
```javascript
"script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com;"
"style-src 'self' 'unsafe-inline';"  // Keep for Tailwind
```

**Changes:**
- Remove `'unsafe-eval'` - Next.js doesn't need it in production builds
- Remove `'unsafe-inline'` from scripts - only needed for styles (Tailwind)

---

## Phase 2: Fix Placeholder Metadata

**File:** `app/layout.tsx`

**Current:**
```typescript
verification: {
  google: "site-verification-code",  // PLACEHOLDER!
  yandex: "site-verification-code",  // PLACEHOLDER!
}
```

**Action:** Remove the entire `verification` block OR replace with real codes

---

## Phase 3: Add Security.txt

**Create:** `public/.well-known/security.txt`

**Content:**
```
Contact: mailto:your-email@example.com
Expires: 2027-01-01T00:00:00.000Z
Preferred-Languages: en
Canonical: https://dotawrapped.com/.well-known/security.txt
```

---

## Phase 4: Verify & Re-scan

1. Deploy changes
2. Test CSP: https://csp-evaluator.withgoogle.com/
3. Request re-scan on VirusTotal
4. Submit to Google Safe Browsing for review

---

## Implementation Commands

```bash
# After editing files, run:
pnpm format
pnpm lint

# Build to verify everything works:
pnpm build
```
