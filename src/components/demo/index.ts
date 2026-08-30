/**
 * The demonstrations behind the "Watch it" picker on each service page.
 *
 * These replaced hand-drawn vector scenes on 2026-08-24: the client asked for something realistic,
 * so the work is now shown photographically. Every plate was generated with Higgsfield
 * (nano_banana_pro), and each "after" was generated *from* its own "before" as the reference image,
 * which is what keeps the house, walkway, fence, sky and camera identical across the pair. That
 * alignment is the whole trick — the wipe only reads as one place changing if nothing else moves.
 *
 * These are illustrations of what each service does. They are not photographs of jobs this company
 * has completed, and nothing on the page says or implies they are. Real job photography, when the
 * client supplies it, belongs in a portfolio section, not here.
 *
 * Landscaping is one property from start to finish (2026-08-24): the same back garden, fence and
 * brick house through all three rows — plain lawn, marked out, excavated, built, grown out, cut.
 * Each plate was chained off the one before it as its reference, which is why the place holds.
 *
 * Snow removal has four clips (regenerated 2026-08-30 on Seedance 2.0 at 4K, delivered 1440px,
 * no people in frame per the client): the Level 1 plough pass, the Level 2 shovel push, the
 * Level 3 salt spreader, and the commercial lot at dusk.
 */

export type Demo =
  | { kind: 'wipe'; id: string; alt: string }
  /** `rate` is playbackRate: the clips are generated at a truer-to-life speed than reads well in
   *  a small stage, so they are run fast rather than regenerated. */
  | { kind: 'video'; src: string; poster: string; trigger: string; rate: number; alt: string };

const wipe = (id: string, alt: string): Demo => ({ kind: 'wipe', id, alt });

const plough = (trigger: string): Demo => ({
  kind: 'video',
  src: '/photos/demo/plow.mp4',
  poster: '/photos/demo/plow-poster.jpg',
  trigger,
  rate: 1.25,
  alt: 'A pickup truck with a yellow plough blade clearing deep snow in one pass, leaving dark asphalt behind it.',
});

/**
 * The continuous lawn care demonstration (2026-08-30): one front lawn carried through the four
 * treatments in the order the page lists them. Plate 0 is the neglected lawn; each later plate is
 * generated from the one before it (same trick as the pairs above), so the journey reads as one
 * place recovering rather than five pictures. Index-aligned with the lawn-care `rows`: the wipe
 * from plate k-1 to plate k is treatment k.
 */
export const lawnStages = {
  count: 5,
  src: (i: number, w: 800 | 1400) => `/photos/demo/lawn-stage-${i}-${w}.jpg`,
  alt: 'The same tired front lawn recovering step by step: thatch cleared out, weeds gone, fed to an even green, then overseeded thick and full.',
} as const;

/**
 * Keyed by ServiceArea.id and index-aligned with that area's `rows`, so row three of the service
 * list and demonstration three are the same thing by construction. An area with no entry here
 * renders no demonstration section.
 */
export const demos: Record<string, readonly Demo[]> = {
  landscaping: [
    wipe('design', 'The same back garden before and after the layout stage: a plain tired lawn, then the patio and planting bed marked out on the grass in white paint with timber stakes and string lines.'),
    wipe('build', 'The same back garden before and after construction: excavated down to a sand base, then a finished interlock patio with fresh sod and a planted bed along the fence.'),
    wipe('maintain', 'The same back garden before and after a maintenance visit: the finished yard with the lawn grown long and straggling over the patio edge, then cut short with mower stripes and a crisp edge along the stone.'),
  ],
  // lawn-care is deliberately absent: it renders LawnJourney (one continuous animation over
  // `lawnStages`) instead of the per-row picker.
  'snow-removal': [
    plough('Clears at 5 cm or more'),
    {
      kind: 'video',
      src: '/photos/demo/shovel.mp4',
      poster: '/photos/demo/shovel-poster.jpg',
      trigger: 'Clears at 2.5 cm or more',
      rate: 1.3,
      alt: 'A wide snow shovel pushing a light snowfall off an asphalt driveway in one clean pass.',
    },
    {
      kind: 'video',
      src: '/photos/demo/salt.mp4',
      poster: '/photos/demo/salt-poster.jpg',
      trigger: 'Clears every snowfall, salting included',
      rate: 1.3,
      alt: 'A walk-behind spreader scattering rock salt in a wide fan across a cleared driveway.',
    },
    {
      kind: 'video',
      src: '/photos/demo/commercial.mp4',
      poster: '/photos/demo/commercial-poster.jpg',
      trigger: '24/7 across Mississauga and the GTA',
      rate: 1.15,
      alt: 'A plough truck clearing long lanes through a snow-covered commercial parking lot at dusk, under the lot lights.',
    },
  ],
};
