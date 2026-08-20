# Luxury Landscaping - Design System

## Design read

Reading this as: a **local-business marketing landing page for Mississauga homeowners (and some
commercial property managers) choosing a landscaper**, with a **premium-residential, calm,
photographic** language, leaning toward **native CSS + GSAP scroll choreography on a single deep
green accent**.

The name is "Luxury", so the page has to look expensive without looking like a luxury-goods brand:
restrained, photographic, unhurried. The buyer wants to know three things fast: what you do, that
you show up, and how to get a quote. Quality over quantity: four sections, two photographs, as
few words as the facts allow.

**Service area:** Mississauga and the GTA, stated as such; no specific towns are listed.

**Mode:** greenfield (the old luxurylandscaping.ca returns 404; no brand assets were available).

## Dials

`DESIGN_VARIANCE 7` / `MOTION_INTENSITY 7` / `VISUAL_DENSITY 2`

Premium-consumer preset, density pulled down to 2 on the client's instruction to keep the page
concise. Motion sits at 7 because the hero is the whole idea: one scroll gesture turns a neglected
yard into a maintained one.

## 1. Colour

One accent, locked across the whole page. Neutrals lean slightly cool so the green reads warm.
The premium-consumer beige/brass palette was deliberately avoided.

| Token | Value | Use |
|---|---|---|
| `--green` | `#2e7a47` | The only accent: CTAs, focus, icons |
| `--green-hot` | `#3a9158` | Hover |
| `--surface` | `#0e1210` | Page |
| `--surface-2` | `#141a16` | Reviews band, footer |
| `--on-surface` | `#e6e8e3` | Text |
| `--on-surface-muted` | `#a2aaa3` | Secondary text (AA) |

**Dark only**, by the client's decision (2026-08-19). No toggle, no `prefers-color-scheme`
branch; `color-scheme: dark` so native form controls match.

## 2. Typography

- **Display:** Outfit Variable 600, `letter-spacing -0.02em`, `line-height 1.05`. Sans display on
  purpose; no serif.
- **Body:** Figtree Variable 400-600, `1.0625rem / 1.6`, measure capped at `52-58ch`.
- Self-hosted via `@fontsource-variable`, `font-display: swap`.

**Eyebrow budget:** zero. No small-caps labels anywhere; headlines carry it.

## 3. Space and shape

- Scale `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`px as `--space-*`.
- Shell `min(1320px, 100% - 2 * gutter)`, gutter `clamp(20px, 4vw, 64px)`.
- Section rhythm `clamp(88px, 11vw, 160px)`.
- Masthead is 84px (`--nav-h`), raised from 72px on 2026-08-20 to carry the 68px logo lockup.
- **Shape lock: radius 4px everywhere.** Buttons, inputs, icon buttons. No pills, no cards. The
  one documented exception is the on/off switch in the cookie-preferences dialog, which is a
  pill because that is the shape users read as a switch.

## 4. Motion

GSAP + ScrollTrigger is the only animation system; nothing competes for frames.

| Purpose | Spec | Why |
|---|---|---|
| Hero transformation | section 260dvh, stage sticky; maintained plate clipped by `--cut` 0% to 100%, `scrub 0.5`; 2px cut line rides the edge; copy fades over the last third | The reader mows the lawn: one scroll value, neglected to maintained |
| Reveal on enter | IntersectionObserver adds `.is-in`; `y 18 -> 0`, opacity, 620ms, `cubic-bezier(.16,1,.3,1)`, stagger 60ms capped at 7 | Hierarchy as sections arrive |
| Hover / press | 160ms ease-out; press `translateY(1px)` 70ms | Tactile feedback |

**Hard rules.** No `window.addEventListener('scroll')`, no scroll values in React state, GSAP
contexts reverted on unmount (`useGSAP` scope). Only `transform`, `opacity` and the clip variable
animate.

**Reduced motion.** The hero collapses to one screen showing the maintained yard; reveals are
instant. Nothing is gated behind an animation; without JavaScript everything is visible.

## 5. Layout families (repetition guard)

| # | Section | Family |
|---|---|---|
| 1 | Hero | Full-bleed sticky photograph, copy bottom-left |
| 2 | Doors | Two half-width links over one rule, each previewing the page behind it (/services/, /packages/) |
| 3 | Work | One large photo + four small, 5-column grid; real job photos from the Google Business Profile |
| 4 | Reviews | Sticky heading + single column of quotes, 5/7 split |
| 5 | Contact | Sticky intro + two-column form |

Four sections, four families. No cards, no photos outside the hero. `/faq/` is a second document
(sticky heading + definition list) sharing the masthead and footer.

**Catalogue pages (added 2026-08-20).** The home page no longer lists services; it opens two
doors. `/services/` carries every offering from the client's original Wix site in three numbered
areas (Landscaping, Lawn care, Winter services), and `/packages/` carries the four lawn care
programs (Basic, Deluxe, Luxury, Consulting). Simplified the same day on Warra's feedback ("too complicated"): /services/ is
three groups of plain rows (name, one sentence); /packages/ is four columns side by side with
visits, one line and a short check-list. No numbering, no sticky columns, no jump lists. Content lives in
`src/content/services.ts`; the short list in `site.ts` still drives the contact form.

## 6. Content rules

`src/content/site.ts` is the single source of truth. Everything on the page comes from the
Google Business listing or the client's own instructions (service list, GTA service area). The
Google rating is deliberately not shown (client's call). **Never add** pricing, guarantees,
hours, response times, coverage areas, years in business, certifications or statistics unless the
client supplies them. Reviews are quoted verbatim from Google and attributed to the public
display name.

## 7. Photography

The page has exactly two photographs: the same front yard neglected and maintained, rendered from
one reference so the camera, house and light match, then resized to the same pixel grid so the
hero's cut line never jumps (`public/photos/yard-before-*.jpg`, `yard-after-*.jpg` at 900 / 1400 /
2048 wide). No people, no branding. `heroPlates` in `site.ts` holds the paths and alt text.
