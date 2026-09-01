import { VIDEO_BASE } from './media.ts';

/**
 * Content for the three service pages.
 *
 * Everything here comes from the client's original Wix site (WIX-SITE-CONTENT.md, re-verified
 * 2026-08-20) plus the client's 2026-08-30 revisions: aeration, grub control and tree & shrub
 * pruning dropped from lawn care; fertilization and overseeding split into their own rows; the
 * landscaping Maintain list rebuilt around cutting, weeding, pruning and lawn repair. No pricing,
 * no guarantees. The short list in site.ts still drives the quote form.
 *
 * Each area is a page of its own (2026-08-24): `path` is the URL, `nav` the header label and
 * `door` the one line the home page shows. Adding an area here adds it to the header, the home
 * page, the sitemap and the prerendered shell; it still needs an entry in vite.config.ts.
 *
 * `detail` (landscaping): a longer paragraph revealed when the row is pressed open on the page.
 * `banner`: the animated wallpaper behind each page's opening words — a muted looping clip filling
 * the whole full-bleed header rectangle, which ends where the service rows begin. Every clip is
 * the work itself happening with no people in frame (client's call): sod unrolling on
 * /landscaping/, a tired lawn healing into deep green on /lawn-care/, a plough blade clearing snow on
 * /snow-removal/. Generated with Seedance 2.0 at 4K (2026-08-30) and delivered at 1920px, with
 * `-640` encodes for phones. The loops run on every device — no motion or data opt-outs (client's call).
 */

export type ServiceRow = { name: string; text: string; detail?: string };
export type ServiceArea = {
  id: string;
  path: string;
  nav: string;
  title: string;
  lede: string;
  door: string;
  banner?: { video: string; poster: string };
  rows: readonly ServiceRow[];
};

export const serviceAreas: readonly ServiceArea[] = [
  {
    id: 'landscaping',
    path: '/landscaping/',
    nav: 'Landscaping',
    title: 'Landscaping',
    lede: 'We design it, build it and keep it looking that way.',
    door: 'Design, build and maintain — from the first drawing to weekly care.',
    banner: {
      video: `${VIDEO_BASE}/banner-landscaping.mp4`,
      poster: '/photos/demo/banner-landscaping-poster.jpg',
    },
    rows: [
      {
        name: 'Design',
        text: 'A plan you approve before any work is scheduled — drawn up professionally or shaped together with you.',
        detail:
          'It starts with a consultation: your ideas, the style you want, and any features you would like in the design. From there, we work with a landscape architect who can provide full drawings — or we work through it with you directly to see exactly what you want. Revisions are welcome, and the work is only scheduled once you have approved the plan.',
      },
      {
        name: 'Build',
        text: 'Patio stones, planting with garden reconstruction, sod, irrigation, small tree removal and artificial grass.',
        detail:
          'Quality materials, priced within your range: patio stones, planting with garden reconstruction, removing and installing sod, irrigation system installation, smaller tree removal and artificial grass. We complete each project as if it were our own backyard.',
      },
      {
        name: 'Maintain',
        text: 'Weekly or bi-weekly lawn cutting, garden weeding, shrub and small tree pruning, lawn repair, mulch and aggregates.',
        detail:
          'Care that keeps the finished yard looking finished. Weekly or bi-weekly lawn cutting, garden weeding, shrub and small tree pruning, lawn repair where the turf has thinned or torn, and fresh mulch and aggregates when the beds need them.',
      },
    ],
  },
  {
    id: 'lawn-care',
    path: '/lawn-care/',
    nav: 'Lawn care',
    title: 'Lawn care',
    lede: 'The treatments that keep a lawn healthy all season.',
    door: 'Dethatching, weed control, fertilization and overseeding.',
    banner: {
      video: `${VIDEO_BASE}/banner-lawn.mp4`,
      poster: '/photos/demo/banner-lawn-poster.jpg',
    },
    rows: [
      {
        name: 'Dethatching',
        text: 'Clears the layer of dead thatch off the turf so oxygen, water and nutrients can reach the roots.',
      },
      {
        name: 'Weed control',
        text: 'Targeted treatment that clears dandelions, clover and crabgrass out of the lawn and keeps them from coming back — so the water and nutrients in your soil feed grass, not weeds.',
      },
      {
        name: 'Fertilization',
        text: 'A feeding matched to the season, for steady growth and deep, even colour.',
      },
      {
        name: 'Overseeding',
        text: 'Fresh seed over the existing turf to thicken thin areas and fill in bare patches.',
      },
    ],
  },
  {
    id: 'snow-removal',
    path: '/snow-removal/',
    nav: 'Snow removal',
    title: 'Snow removal',
    lede: 'Snow removal that makes Canadian winters the least of your worries. Contact us for pricing.',
    door: 'Residential and commercial clearing, all winter, across the GTA.',
    banner: {
      video: `${VIDEO_BASE}/banner-snow.mp4`,
      poster: '/photos/demo/banner-snow-poster.jpg',
    },
    rows: [
      { name: 'Residential · Level 1', text: 'Storm protection. We clear at 5 cm or more.' },
      { name: 'Residential · Level 2', text: 'Light snowfall protection. We clear at 2.5 cm or more.' },
      { name: 'Residential · Level 3', text: 'Luxury protection. We clear every snowfall, salting included.' },
      { name: 'Commercial', text: '24/7 snow removal across Mississauga and the GTA.' },
    ],
  },
] as const;
