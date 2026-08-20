/**
 * Single source of truth for every business fact on the site.
 *
 * Everything here is either (a) verbatim from the company's Google Business listing, or (b) the
 * service list as supplied by the client. Nothing else on the page may assert a fact about the
 * company that is not in this file. Do not add statistics, guarantees, pricing, coverage claims,
 * certifications or years-in-business unless the client supplies them.
 */

export const company = {
  name: 'Luxury Landscaping',
  tagline: 'Landscape design, build and lawn care across Mississauga and the GTA.',
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

export type ServiceGroup = { id: string; title: string; items: readonly string[] };

/**
 * Service list is verbatim from the client. Grouping is editorial so the page is not a 19-row
 * list; the individual names are unchanged so the contact form can offer them exactly.
 */
export const serviceGroups: readonly ServiceGroup[] = [
  {
    id: 'design-build',
    title: 'Design & build',
    items: ['Landscape design', 'Landscape construction / installation', 'Mulch installation', 'Aggregate installation'],
  },
  {
    id: 'lawn-maintenance',
    title: 'Lawn maintenance',
    items: ['Weekly lawn maintenance', 'Bi-weekly lawn maintenance', 'Lawn mowing', 'Lawn care programs'],
  },
  {
    id: 'lawn-health',
    title: 'Lawn health',
    items: ['Top dressing', 'Fertilization', 'Overseeding', 'Weed control', 'Grub control', 'Lawn aeration', 'Dethatching'],
  },
  {
    id: 'pruning-winter',
    title: 'Pruning & winter',
    items: ['Small tree pruning', 'Shrub pruning', 'Residential winter services', 'Commercial winter services'],
  },
] as const;

/** Flat list for the contact form select, in the client's original order. */
export const allServices = [
  'Landscape design',
  'Landscape construction / installation',
  'Weekly lawn maintenance',
  'Bi-weekly lawn maintenance',
  'Lawn mowing',
  'Top dressing',
  'Fertilization',
  'Overseeding',
  'Weed control',
  'Grub control',
  'Lawn aeration',
  'Dethatching',
  'Mulch installation',
  'Aggregate installation',
  'Small tree pruning',
  'Shrub pruning',
  'Lawn care programs',
  'Residential winter services',
  'Commercial winter services',
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

/** Header links: the two catalogue pages, Team and FAQ. Everything else is reached by scrolling. */
export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'Programs', href: '/packages/' },
  { label: 'Team', href: '/team/' },
  { label: 'FAQ', href: '/faq/' },
] as const;

export type Person = { name: string; role: string; body: string };

/**
 * Meet the team. Names, titles and bios are the client's own, from the Team page of their
 * original site (typo "knowledgable" fixed). CONFIRM the three are still current before launch.
 * No photos until the client supplies real ones.
 */
export const team: readonly Person[] = [
  {
    name: 'Patrick Warren',
    role: 'Owner',
    body: 'Patrick started the company in 2005 and has been operating and growing it steadily ever since. A graduate of the University of Guelph with a degree in Business and Economics.',
  },
  {
    name: 'Brent Graham',
    role: 'Project Manager',
    body: 'Brent has spent the last 20 years working with and studying turf, trees, weeds and insects, specifically in golf course maintenance. He graduated from the University of Guelph with a diploma in Turfgrass Management.',
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

export type Faq = { q: string; a: string };

/**
 * FAQ content. Every answer is limited to what the client has told us or what is on the Google
 * listing. No pricing, timelines, guarantees or named towns beyond "Mississauga and the GTA".
 */
export const faqs: readonly Faq[] = [
  {
    q: 'Where do you work?',
    a: 'We are based in Mississauga and take on residential and commercial properties across the GTA. If you are not sure whether we cover your address, send it through the quote form and we will tell you straight away.',
  },
  {
    q: 'How does a quote work?',
    a: 'Send the form or call. We come out, walk the property with you, and follow up with a written quote for the work discussed.',
  },
  {
    q: 'What do you do?',
    a: 'Landscape design and construction, mulch and aggregate installation, weekly or bi-weekly lawn maintenance, lawn mowing, lawn care programs, top dressing, fertilization, overseeding, weed and grub control, aeration, dethatching, small tree and shrub pruning, and residential and commercial winter services.',
  },
  {
    q: 'Do you do one-off jobs or only ongoing programs?',
    a: 'Both. Design and build work is a one-off project. Lawn maintenance is offered weekly or bi-weekly, and lawn care programs run through the season.',
  },
  {
    q: 'Do you work with businesses?',
    a: 'Yes. Commercial lawn maintenance and commercial winter services are part of what we do. Tell us about the property and we will quote it the same way.',
  },
  {
    q: 'How do I reach you?',
    a: 'Call (905) 781-3648, email sales@luxurylandscaping.ca, or use the quote form on the home page. Our base is 1824 Medallion Ct, Mississauga, ON L5J 2L7.',
  },
] as const;

/** The four lawn care programs as they appear in the quote form's Service dropdown. */
export const programOptions = ['Basic program', 'Deluxe program', 'Luxury program', 'Consulting'] as const;

/** One label for the one contact intent, used identically everywhere. */
export const cta = { label: 'Get a quote', href: '/#contact' } as const;
