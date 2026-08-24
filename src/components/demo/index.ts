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
 * Snow removal has two clips. The three residential levels share the driveway plough (veo3_1_lite)
 * and differ only by the trigger stated over it, because they differ by *when* the plough comes
 * out, not by what ploughing looks like. Commercial has its own clip in an actual commercial lot
 * (seedance1_5), because that is a different job in a different place.
 *
 * The commercial clip is 480p where the residential one is not — it was generated on the last of
 * the credit budget, and 720p did not fit. It is the softest asset on the site; regenerate it at
 * 720p when there are credits to spend.
 */

export type Demo =
  | { kind: 'wipe'; id: string; alt: string }
  /** `rate` is playbackRate: the clips are generated at a truer-to-life speed than reads well in
   *  a small stage, so they are run fast rather than regenerated. */
  | { kind: 'video'; src: string; poster: string; trigger: string; rate: number; alt: string };

const wipe = (id: string, alt: string): Demo => ({ kind: 'wipe', id, alt });

const DRIVEWAY_ALT = 'A plough truck clearing a snow-covered residential driveway, leaving bare asphalt behind it.';

const plough = (trigger: string): Demo => ({
  kind: 'video',
  src: '/photos/demo/plow.mp4',
  poster: '/photos/demo/plow-poster.jpg',
  trigger,
  rate: 1.8,
  alt: DRIVEWAY_ALT,
});

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
  'lawn-care': [
    wipe('aeration', 'The same lawn before and after core aeration: dense straw thatch over compacted ground, then soil cores lying on the surface and open holes through the turf.'),
    wipe('feeding', 'The same front lawn before and after a season of feeding and overseeding: thin, pale and patchy, then thick and evenly deep green.'),
    wipe('weeds', 'The same lawn before and after weed and grub control: dandelions, clover and dead brown patches, then uniform clean turf.'),
    wipe('pruning', 'The same foundation shrubs before and after pruning: overgrown and crowding the window, then cut back to two clean rounded domes with the walkway clear.'),
  ],
  'snow-removal': [
    plough('Clears at 5 cm or more'),
    plough('Clears at 2.5 cm or more'),
    plough('Clears every snowfall, salting included'),
    {
      kind: 'video',
      src: '/photos/demo/commercial.mp4',
      poster: '/photos/demo/commercial-poster.jpg',
      trigger: '24/7 across Mississauga and the GTA',
      rate: 1.4,
      alt: 'A Dodge Ram plough truck clearing a large snow-covered commercial parking lot, uncovering the painted bay lines behind it.',
    },
  ],
};
