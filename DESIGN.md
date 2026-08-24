# Luxury Landscaping - Design System

## Design read

Reading this as: a **local-business marketing landing page for Mississauga homeowners (and some
commercial property managers) choosing a landscaper**, with a **premium-residential, calm,
photographic** language, leaning toward **native CSS + GSAP scroll choreography on a single deep
green accent**.

The name is "Luxury", so the page has to look expensive without looking like a luxury-goods brand:
restrained, photographic, unhurried. The buyer wants to know three things fast: what you do, that
you show up, and how to get a quote. Quality over quantity: five sections, two photographs, as
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
| Heading wipe | same observer; `clip-path: inset(… 100% … )` to `inset(… -0.5em … )`, 700ms, same curve | The hero's mower pass at heading scale |
| Band rule draw | same observer; `::before` hairline `scaleX(0 -> 1)` from the left, 800ms, same curve | The band's top edge drawn rather than switched on |
| Hover / press | 160ms ease-out; press `translateY(1px)` 70ms | Tactile feedback |

**One gesture (2026-08-24).** Everything on the page enters left to right, because that is what the
hero does: the maintained lawn is revealed by a clip-path sweeping across like a mower pass. The
section headings repeat that stroke (`.wipe`) and the hairline above each band is drawn the same
way (`.rule`). Nothing rises, spins, scales or parallaxes. One idea, used everywhere, is what keeps
a page this restrained from feeling like a collection of effects.

**Service demonstrations (2026-08-24).** Each service page carries a "Watch it" section: one tab
per row of the service list, and a purpose-built animation behind each tab. Landscaping draws the
plan, lays it and cuts it; lawn care works on a cross-section of turf and soil so each treatment is
shown doing what it actually does; snow removal runs the same driveway and plough at each level's
trigger depth, so the difference between "5 cm or more" and "every snowfall" is watched rather than
read.

Rules for this section:

- **Photographic, not drawn (changed 2026-08-24).** The first version was flat vector diagrams; the
  client asked for realism, so the work is now shown in photographs and video generated with
  Higgsfield. Landscaping and lawn care are before/after plates of the same place; snow removal is
  video, because a plough is a moving object and a still of one explains nothing.
- **Every "after" plate is generated from its own "before"** as the reference image. That is what
  keeps the house, fence, walkway, sky and camera identical across a pair, and the wipe only reads
  as one place changing if nothing else moves. Regenerating an "after" from a text prompt alone
  will break the pair.
- **These are illustrations of the service, not a portfolio.** Nothing on the page says or implies
  these are jobs this company completed. Real job photography, when the client supplies it, belongs
  in a portfolio section — not here.
- **Two plough clips.** The three residential levels share the driveway clip and differ only by the
  trigger stated over it — they differ by when the plough comes out, not by what ploughing looks
  like. Commercial has its own clip in an actual commercial lot, because that is a different job in
  a different place.
- **Clips declare their own `playbackRate`.** A plough at true speed crawls in a stage this size,
  so the clips are run fast rather than regenerated. Tune the number, don't spend credits.
- **Landscaping is one property end to end.** Design, Build and Maintain are the same back garden,
  fence and brick house: plain lawn, marked out, excavated, built, grown out, cut. Each plate was
  chained off the previous one as its reference. If you regenerate any single plate from a text
  prompt alone, the property will drift and the set stops being one story.
- **It repeats what the rows already say.** Nothing is only in the animation, so nothing is lost
  without JavaScript, under reduced motion, or to a screen reader (each stage is one `role="img"`
  with the row's own name and sentence as its label).
- **The wipe is the hero's gesture doing real work.** The "after" plate is clipped by `--cut` and
  swept left to right over the "before" one, the same mechanic and the same bright leading edge as
  the hero. The change happens in place instead of cutting between two pictures.
- **Started by scroll, driven by the picker.** An IntersectionObserver plays the timeline the first
  time the stage is on screen. It is deliberately not scroll-scrubbed: the hero owns scrubbing on
  this site, mobile browsers make it unreliable, and a demonstration the visitor drives with a
  picker should not also fight them for the scroll position.
- **Reduced motion** jumps the wipe to its end and never autoplays the video, which keeps its
  controls so it runs only if asked.
- **Weight.** The plates are ~150-300 KB each at 1400px and only the selected pair loads. The
  plough clip is 5 MB with `preload="none"`, so it is fetched only when it plays.

**One entrance per element.** An element carries `.reveal` **or** `.wipe` **or** `.rule`, never two,
and a `.wipe` heading never sits inside a `.reveal` parent — stacked entrances read as a stutter.
When a container needs its rule drawn, the container takes `.rule` and its children take `.reveal`.

**Hard rules.** No `window.addEventListener('scroll')`, no scroll values in React state, GSAP
contexts reverted on unmount (`useGSAP` scope). Only `transform`, `opacity` and clip paths animate.
Every primitive has a `prefers-reduced-motion` branch and a no-JS resting state that is fully
visible: the base `.wipe` and `.rule` rules are the finished state, and only `html.js` hides them.

**Reduced motion.** The hero collapses to one screen showing the maintained yard; reveals are
instant. Nothing is gated behind an animation; without JavaScript everything is visible.

## 5. Layout families (repetition guard)

| # | Section | Family |
|---|---|---|
| 1 | Hero | Full-bleed sticky photograph, copy bottom-left |
| 2 | Services | Heading over three doors, one rule, each door previewing a service page |
| 3 | Programs | Heading across the top, then one full-width rule-separated row per program (a ledger), on `--surface-2` |
| 4 | Reviews | Heading beside one Google quote, 5/7 split, and the way through to /reviews/ |
| 5 | Contact | Sticky intro + two-column form |

Five sections, five families. No cards, no photos outside the hero. The sub-pages are separate
documents sharing the masthead and footer. Services and Programs are now adjacent, so Programs
carries the `--surface-2` band: doors on the dark ground, then a ledger on the lighter one, so the
season programs can never read as a fourth service.

**Our work removed (2026-08-24).** The five-photo grid of past jobs is gone from the home page on
the client's instruction. The photographs themselves are still in `public/photos/work-*.jpg` and
still in git history, unreferenced; delete them if they are not coming back. With the grid gone the
page is back to exactly two photographs, both in the hero.

**Catalogue pages (added 2026-08-20).** The home page no longer lists services; it opens doors.
Each page is plain rows (name, one sentence) or, for the programs, four columns side by side with
visits, one line and a short check-list. No numbering, no sticky columns, no jump lists. Content
lives in `src/content/services.ts`; the short list in `site.ts` still drives the contact form.

**One page per service (2026-08-24).** `/services/` was split into three top-level pages —
`/landscaping/`, `/lawn-care/`, `/snow-removal/` — so each offering can carry its own title,
description, canonical and `Service` schema, and rank on its own terms. There is no `/services/`
hub: the word appears as the heading of the home page band and as the header nav group that holds
the three, which keeps the masthead three items wide.

**Reviews became a page (2026-08-24).** `/reviews/` carries all three Google quotes and links to
the listing; the home band shows the first one and the way through. Split rather than duplicated,
because three quotes repeated on both would be thin, duplicate content. No `Review` or
`AggregateRating` markup: the quotes are real but we hold no ratings or dates, and self-hosted
review markup for your own business is discounted anyway. The band sits immediately before the
quote form, which is where proof belongs.

**Programs moved out of Services (2026-08-24).** `/packages/` became `/programs/`, matching the
label a visitor actually sees, and on the home page it left the Services row for a band of its own. Handing over a season is a different decision from booking a job, and pairing the two
made a program read as a fourth service. The only link between them now is one contextual line on
`/lawn-care/`, where the programs genuinely are the next question.

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
