# Luxury Landscaping

Marketing site for Luxury Landscaping, Mississauga ON. Single scroll-driven page (four sections)
plus separate service, quote, team and legal documents.
React 19 + TypeScript + Vite, GSAP ScrollTrigger, Phosphor icons, self-hosted variable fonts.

## Commands

```
npm run dev       # local dev server
npm run build     # tsc + vite build + scripts/prerender.mjs (SEO shell + llms.txt)
npm run preview   # serve dist/
node scripts/optimize-photos.mjs   # convert PNGs in public/photos to optimised JPEGs
```

## Where things live

- `src/content/site.ts`: every business fact, service, review and the two hero plates. Edit here first.
- `src/sections/*`: Hero, Services, Reviews on the home page; Contact renders on /quote/ (see `src/App.tsx`).
- `src/content/services.ts`: the three service areas. Each area carries its own `path` and nav
  label, so adding one updates the header, the home page, the prerendered shell and llms.txt — it
  still needs an entry in `vite.config.ts` and a matching `<slug>/index.html`.
- `src/pages/ServiceAreaPage.tsx` + `{landscaping,lawn-care,snow-removal}/index.html`: one page per
  service area, each its own entry with its own metadata and `Service` schema.
- `src/components/ServiceDemo.tsx` + `src/components/demo/index.ts`: the "Watch it" section on the
  landscaping and snow pages. One `Demo` per service row, index-aligned with that area's `rows`.
  Media lives in `public/photos/demo/` — before/after plates generated with Higgsfield, each
  "after" made *from* its own "before" so the pair aligns, plus one video per snow level
  (plough / shovel / salt) and the commercial lot clip.
- `src/components/LawnJourney.tsx`: the lawn care page's demonstration — one lawn carried through
  all four treatments in one continuous animation over the chained `lawn-stage-*` plates.
- `src/pages/QuotePage.tsx` + `quote/index.html` + `src/quote.tsx`: the quote form on its own page;
  every "Get a quote" button lands here (`cta.href` in site.ts).
- `src/pages/ReviewsPage.tsx` + `reviews/index.html` + `src/reviews.tsx`: the Google reviews in full.
- `src/pages/TeamPage.tsx` + `team/index.html` + `src/team.tsx`: the Meet the Team page (Patrick and Andrew).
- `src/styles/tokens.css`: colour, type, spacing, radius tokens (dark only).
- `src/styles/layout.css` + `sections.css`: masthead, sections, responsive rules.
- `DESIGN.md`: the design system and the reasoning behind it.
- `index.html`: meta, Open Graph, JSON-LD `LandscapingBusiness`.

## What the site does with data (keep the legal pages in sync with this)

Inventory as of 2026-08-19. If anything here changes, update `src/content/legal.ts` the same day
and bump `CONSENT_VERSION` in `src/lib/consent.ts` so visitors are asked again.

| Technology | Type | Data | Party |
|---|---|---|---|
| Quote form (`name`, `email`, `phone`, `service`, `message`) | JSON POST to formsubmit.co | contact details + message | FormSubmit (third party), delivered to sales@luxurylandscaping.ca |
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
4. The quote form posts to FormSubmit (formsubmit.co), which emails every submission to
   **sales@luxurylandscaping.ca** on any host, with no account or key. The very first
   submission sends a one-time "Activate form" email to that inbox; click the link once and all
   later submissions are delivered. The hidden `_subject` field sets the email subject. To change
   the recipient, change `contact.email` in `src/content/site.ts`.
4. If real project photography arrives, the hero plates can be replaced by two photos of one yard
   taken from the same spot (before and after); update `heroPlates` in `site.ts`.
