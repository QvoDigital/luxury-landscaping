/**
 * Single source of truth for every business fact on the site.
 *
 * Everything here is either (a) verbatim from the company's Google Business listing, or (b) the
 * service list as supplied by the client. Nothing else on the page may assert a fact about the
 * company that is not in this file. Do not add statistics, guarantees, pricing, coverage claims,
 * certifications or years-in-business unless the client supplies them.
 */

// Extension included: scripts/prerender.mjs loads this file through Node, which will not
// resolve an extensionless specifier the way Vite does.
import { serviceAreas } from './services.ts';

export const company = {
  name: 'Luxury Landscaping',
  tagline: 'Landscape design, build and maintain across Mississauga and the GTA.',
  headline: 'Yards worth coming home to.',
  /** The client's own tagline from the original site: "Design, Build & Maintain Your Space". */
  sub: 'Design, build and maintain your space. Mississauga and the GTA.',
  url: 'https://luxurylandscaping.ca',
} as const;

export const contact = {
  street: '1824 Medallion Ct',
  city: 'Mississauga',
  region: 'ON',
  postal: 'L5J 2L7',
  country: 'CA',
  phone: '(905) 781-3648',
  phoneHref: 'tel:+19057813648',
  /** Both addresses are published on the client's original site. */
  email: 'sales@luxurylandscaping.ca',
  careersEmail: 'patrick@luxurylandscaping.ca',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Luxury+Landscaping+1824+Medallion+Ct+Mississauga+ON+L5J+2L7',
} as const;

/** The business's social profiles. Instagram is the only one they run. */
export const social = {
  instagram: 'https://www.instagram.com/luxurylandscaping.ca/',
} as const;

export type ServiceGroup = { id: string; title: string; items: readonly string[] };

/**
 * Service list is verbatim from the client, grouped for the no-JS home shell and llms.txt. The
 * quote form's dropdown is built from src/content/services.ts so it matches the Services page.
 */
export const serviceGroups: readonly ServiceGroup[] = [
  {
    id: 'design-build',
    title: 'Design & build',
    items: [
      'Landscape design',
      'Landscape construction / installation',
      'Planting & garden reconstruction',
      'Mulch installation',
      'Aggregate installation',
    ],
  },
  {
    id: 'lawn-maintenance',
    title: 'Lawn maintenance',
    items: [
      'Weekly lawn cutting',
      'Bi-weekly lawn cutting',
      'Garden weeding',
      'Shrub & small tree pruning',
      'Lawn repair',
    ],
  },
  {
    id: 'lawn-health',
    title: 'Lawn health',
    items: ['Dethatching', 'Weed control', 'Fertilization', 'Overseeding'],
  },
  {
    id: 'winter',
    title: 'Winter',
    items: ['Residential winter services', 'Commercial winter services'],
  },
] as const;

export type Review = { quote: string; name: string };

/** Public Google reviews, quoted verbatim and trimmed to the sentence that carries. */
export const reviews: readonly Review[] = [
  {
    quote: 'They arrived on time, worked efficiently, and transformed our weed-filled yard into a clean, well-kept space.',
    name: 'Ethan Taylor',
  },
  {
    quote: 'Gave me a fair quote and came on time and didn’t rush. Very polite. I will recommend him to anyone.',
    name: 'Adriano C',
  },
  {
    quote: 'Patrick and his team, from start to finish, made my landscaping my little oasis.',
    name: 'Steve Johnson',
  },
  {
    quote: 'Absolutely amazing, the quality is amazing as well as the price.',
    name: 'Ali',
  },
  /** A review-summary snippet from the listing itself; Google shows it without a name. */
  {
    quote: 'Truly a luxury service, reliable team, stellar work.',
    name: '',
  },
] as const;

/**
 * Hero plates. Two photographs of the same front yard from the same camera position: neglected
 * and maintained. The hero wipes from one to the other as the page is scrolled. Both are AI
 * renders made for this build (no people, no branding); `-900` variants serve narrow screens.
 */
export const heroPlates = {
  before: {
    src: '/photos/yard-before-1400.jpg',
    srcSet: '/photos/yard-before-900.jpg 900w, /photos/yard-before-1400.jpg 1400w, /photos/yard-before-2048.jpg 2048w',
    alt: 'The same front yard neglected: long patchy grass, weeds in the beds, overgrown shrubs.',
  },
  after: {
    src: '/photos/yard-after-1400.jpg',
    srcSet: '/photos/yard-after-900.jpg 900w, /photos/yard-after-1400.jpg 1400w, /photos/yard-after-2048.jpg 2048w',
    alt: 'A manicured front yard with a striped lawn, rounded boxwood and white hydrangeas beside a stone home.',
  },
  width: 2048,
  height: 1382,
} as const;

export type NavLink = { label: string; href: string };
export type NavEntry = NavLink | { label: string; items: readonly NavLink[] };

/**
 * Header links. "Services" is a label over the three service pages rather than a page of its own,
 * so the header stays three items wide while every service is one click away. Everything else on
 * the home page is reached by scrolling.
 */
export const nav: readonly NavEntry[] = [
  { label: 'Services', items: serviceAreas.map((a) => ({ label: a.nav, href: a.path })) },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'About us', href: '/team/' },
];

/** The same header links flattened to one list, for places that cannot show a group. */
export const navPages: readonly NavLink[] = nav.flatMap((n) => ('items' in n ? [...n.items] : [n]));

export type Person = { name: string; role: string; body: string };

/**
 * Meet the team. Names, titles and bios are the client's own, from the Team page of their
 * original site (typo "knowledgable" fixed). Brent Graham was removed 2026-08-20 on the client's
 * instruction: no longer with the company.
 * No photos until the client supplies real ones.
 */
export const team: readonly Person[] = [
  {
    name: 'Patrick Warren',
    role: 'Owner',
    body: 'Patrick started the company in 2005 and has been operating and growing it steadily ever since. A graduate of the University of Guelph with a degree in Business and Economics.',
  },
  {
    name: 'James Boodram',
    role: 'Maintenance Manager',
    body: 'James has been with Luxury for 5+ years and has looked after the daily maintenance from the start. He is very knowledgeable in everything landscaping and we are lucky to have him on the team.',
  },
] as const;

/** Careers line, from the client's original Careers page. */
export const careers = {
  heading: 'Work with us',
  body: 'Luxury Landscaping is expanding. We hire like minds into technical, design and management roles.',
} as const;

/** One label for the one contact intent, used identically everywhere. */
export const cta = { label: 'Get a quote', href: '/quote/' } as const;
