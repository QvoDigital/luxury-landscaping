# Luxury Landscaping

Marketing site for Luxury Landscaping, Mississauga ON. Single scroll-driven page (four sections)
plus a separate /faq/ document.
React 19 + TypeScript + Vite, GSAP ScrollTrigger, Phosphor icons, self-hosted variable fonts.

## Commands

```
npm run dev       # local dev server
npm run build     # tsc + vite build + scripts/prerender.mjs (SEO shell + llms.txt)
npm run preview   # serve dist/
node scripts/optimize-photos.mjs   # convert PNGs in public/photos to optimised JPEGs
```

## Where things live

- `src/content/site.ts`: every business fact, service, review, FAQ and the two hero plates. Edit here first.
- `src/sections/*`: Hero, Services, Reviews, Contact (see `src/App.tsx`).
- `src/pages/FaqPage.tsx` + `faq/index.html` + `src/faq.tsx`: the FAQ page (own entry, FAQPage schema).
- `src/pages/TeamPage.tsx` + `team/index.html` + `src/team.tsx`: the Meet the Team page (Patrick and Andrew).
- `src/styles/tokens.css`: colour, type, spacing, radius tokens (dark only).
- `src/styles/layout.css` + `sections.css`: masthead, sections, responsive rules.
- `DESIGN.md`: the design system and the reasoning behind it.
- `index.html`: meta, Open Graph, JSON-LD `LandscapingBusiness`, hidden Netlify form copy.

## What the site does with data (keep the legal pages in sync with this)

Inventory as of 2026-08-19. If anything here changes, update `src/content/legal.ts` the same day
and bump `CONSENT_VERSION` in `src/lib/consent.ts` so visitors are asked again.

| Technology | Type | Data | Party |
|---|---|---|---|
| Quote form (`name`, `email`, `phone`, `service`, `message`) | form POST to `/` | contact details + message | hosting / form provider (Netlify Forms intended; CONFIRM at deploy) |
| `localStorage["ll-consent"]` | strictly necessary storage | consent choices, timestamp, policy version; 12-month expiry | first party |
| Fonts (Outfit, Figtree) | self-hosted via `@fontsource-variable` | none | first party |
| Analytics / ads / pixels / chat / embeds | **none** | | |
| Outbound links | Google Maps (`rel="noopener noreferrer"`) | none until clicked | third party |

Legal pages: `/privacy/`, `/terms/`, `/cookies/`, `/accessibility/` (one component, four HTML
entries, content in `src/content/legal.ts`). Cookie consent: `src/lib/consent.ts` +
`src/components/CookieConsent.tsx`; footer "Cookie preferences" reopens the dialog. Any future
non-essential script is registered in `src/lib/optional.ts` with its category; `applyConsent()`
runs on load and on every change, loads only what is allowed, and stamps
`<html data-consent="analytics functional marketing">` with the current state (inspect it in
DevTools to verify a choice took effect).

## Before launch

1. Have a lawyer review `src/content/legal.ts` (privacy, terms, cookies, accessibility). Confirm
   the legal entity name and fill in the hosting provider name once deployment is decided.
1. Confirm the service grouping and wording with the client.
1. Confirm Patrick's and Andrew's roles and blurbs on /team/ (written from the Google reviews only)
   and add real photos if they want them.
2. Supply a logo file if one exists and swap it into `src/components/Wordmark.tsx`.
3. `404.html` is the not-found page; Netlify serves it automatically. On other hosts, point the
   404 rule at it.
4. The quote form is wired for Netlify Forms (form name `quote`). **Submissions go to
   sales@luxurylandscaping.ca**: after the first deploy, in Netlify open Forms → quote →
   Notifications → Email notification and enter that address. The hidden `subject` field sets
   the email subject. On other hosts, point the form
   `action` at your endpoint in `src/sections/Contact.tsx`.
4. If real project photography arrives, the hero plates can be replaced by two photos of one yard
   taken from the same spot (before and after); update `heroPlates` in `site.ts`.
