/**
 * Content for the three service pages and /programs/.
 *
 * Everything here comes from the client's original Wix site (WIX-SITE-CONTENT.md, re-verified
 * 2026-08-20), rewritten to one plain sentence per item. No pricing, no guarantees, no visit
 * counts beyond what the client published. The short list in site.ts still drives the quote form.
 *
 * Each area is a page of its own (2026-08-24): `path` is the URL, `nav` the header label and
 * `door` the one line the home page shows. Adding an area here adds it to the header, the home
 * page, the sitemap and the prerendered shell; it still needs an entry in vite.config.ts.
 */

export type ServiceRow = { name: string; text: string };
export type ServiceArea = {
  id: string;
  path: string;
  nav: string;
  title: string;
  lede: string;
  door: string;
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
    rows: [
      {
        name: 'Design',
        text: 'We meet to understand what you want, draw up the plan, and only schedule the work once you have approved it.',
      },
      {
        name: 'Build',
        text: 'Patio stones, garden reconstruction, sod, irrigation, small tree removal and artificial grass. Quality materials, priced within your range.',
      },
      {
        name: 'Maintain',
        text: 'Weekly or bi-weekly care for lawns and gardens: top dressing, fertilizer, overseeding, weed control, grub control, aeration, mulch and aggregates.',
      },
    ],
  },
  {
    id: 'lawn-care',
    path: '/lawn-care/',
    nav: 'Lawn care',
    title: 'Lawn care',
    lede: 'The treatments that keep a lawn healthy all season.',
    door: 'Dethatching, aeration, fertilization, overseeding, weed and grub control.',
    rows: [
      {
        name: 'Dethatching & aeration',
        text: 'Opens up the turf so oxygen, water and nutrients reach the roots.',
      },
      {
        name: 'Fertilization & overseeding',
        text: 'Feeds and seeds the lawn as the weather warms, for the healthiest result.',
      },
      {
        name: 'Weed & grub control',
        text: 'Stops weeds and grubs taking the nutrients meant for your grass.',
      },
      {
        name: 'Tree & shrub pruning',
        text: 'Keeps trees and shrubs healthy and lets more light reach shaded lawn.',
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
    rows: [
      { name: 'Residential · Level 1', text: 'Storm protection. We clear at 5 cm or more.' },
      { name: 'Residential · Level 2', text: 'Light snowfall protection. We clear at 2.5 cm or more.' },
      { name: 'Residential · Level 3', text: 'Luxury protection. We clear every snowfall, salting included.' },
      { name: 'Commercial', text: '24/7 snow removal across Mississauga and the GTA.' },
    ],
  },
] as const;

export type Program = {
  id: string;
  name: string;
  visits: string;
  tagline: string;
  includes: readonly string[];
};

export const programs: readonly Program[] = [
  {
    id: 'basic',
    name: 'Basic',
    visits: 'Minimum 3 visits a season',
    tagline: 'A solid start for your lawn.',
    includes: ['A walk of your property to spot problem areas', 'Dethatching, overseeding and fertilization', 'Watering and care tips to keep it going'],
  },
  {
    id: 'deluxe',
    name: 'Deluxe',
    visits: 'Minimum 4 visits a season',
    tagline: 'A full program, built for your property.',
    includes: [
      'An in-depth walk-through of every concern',
      'A season-long plan written for your lawn',
      'Five targeted treatments, no wasted product',
      'One expert on your lawn from start to finish',
    ],
  },
  {
    id: 'luxury',
    name: 'Luxury',
    visits: 'Minimum 6 visits a season',
    tagline: 'The most care we offer.',
    includes: ['In-depth herbicide, fertilizer and overseeding programs', 'The utmost care for your personal ecosystem', 'By the end, we will basically be family'],
  },
  {
    id: 'consulting',
    name: 'Consulting',
    visits: 'On call',
    tagline: 'An expert when you need one.',
    includes: ['Advice from one of our experts', 'For whatever comes up in your yard'],
  },
] as const;
