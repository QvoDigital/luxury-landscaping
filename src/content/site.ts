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
  sub: 'Design, build and year-round lawn care across the GTA.',
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

/** Header and footer carry two links: the Team and FAQ pages. Everything else is reached by scrolling. */
export const nav = [
  { label: 'Team', href: '/team/' },
  { label: 'FAQ', href: '/faq/' },
] as const;

export type Person = { name: string; role: string; body: string };

/**
 * Meet the team. Patrick and Andrew are the two names that appear in the public Google reviews;
 * the one-line roles and the blurbs are written from what those reviews say they do, nothing
 * more. CONFIRM titles and wording with the client before launch, and swap in real photos if they
 * want them (no photos are shown until then; no AI renders of real people).
 */
export const team: readonly Person[] = [
  {
    name: 'Patrick',
    role: 'Leads the crew',
    body: 'The name you will see most in the reviews. Patrick runs the work on site, start to finish: the crew arrives when they said they would, the job gets done properly, and the yard is left clean.',
  },
  {
    name: 'Andrew',
    role: 'Quotes and site visits',
    body: 'Often the first person you meet. Andrew comes out to the property, takes the time to walk it with you without rushing, and puts together a fair, written quote.',
  },
] as const;

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
    a: 'Call (905) 781-3648 or use the quote form on the home page. Our base is 1824 Medallion Ct, Mississauga, ON L5J 2L7.',
  },
] as const;

/** One label for the one contact intent, used identically everywhere. */
export const cta = { label: 'Get a quote', href: '/#contact' } as const;
