/**
 * Legal copy: privacy policy, terms of use, cookie policy, accessibility statement.
 *
 * Written from an inventory of what this site actually does (see README "What the site does with
 * data"): one quote form, self-hosted fonts, no analytics, no ads, no embeds, no third-party
 * scripts. The only thing stored in the visitor's browser is the cookie-consent record this site
 * writes itself. Keep these documents true: if analytics, a chat widget, an embedded map or any
 * other third-party service is ever added, update the cookie and privacy sections the same day
 * and bump CONSENT_VERSION in src/lib/consent.ts so visitors are asked again.
 *
 * Not legal advice. Have a lawyer review before launch. Items marked CONFIRM need the client.
 */
// Extension kept so scripts/prerender.mjs can import this file directly under Node.
import { company, contact } from './site.ts';

export const legalMeta = {
  effective: '19 August 2026',
  updated: '19 August 2026',
  /** CONFIRM: legal entity name if different from the trading name. */
  entity: company.name,
  address: `${contact.street}, ${contact.city}, ${contact.region} ${contact.postal}, Canada`,
  phone: contact.phone,
  phoneHref: contact.phoneHref,
  /** The quote form is delivered by FormSubmit (formsubmit.co); see src/sections/Contact.tsx. */
  host: 'FormSubmit, our form-delivery provider',
} as const;

export type LegalBlock = { heading?: string; paragraphs: readonly string[]; list?: readonly string[] };
export type LegalDoc = {
  id: 'privacy' | 'terms' | 'cookies' | 'accessibility';
  path: string;
  title: string;
  navLabel: string;
  description: string;
  intro: string;
  blocks: readonly LegalBlock[];
};

const contactLine = `call ${legalMeta.phone} or write to ${legalMeta.entity}, ${legalMeta.address}`;

export const legalDocs: readonly LegalDoc[] = [
  {
    id: 'privacy',
    path: '/privacy/',
    title: 'Privacy Policy',
    navLabel: 'Privacy Policy',
    description: `How ${company.name} collects, uses and protects personal information sent through this website.`,
    intro: `This policy explains what personal information ${legalMeta.entity} ("we", "us") collects through this website, why, how it is used and protected, and the choices you have. We follow the Personal Information Protection and Electronic Documents Act (PIPEDA), Canada's federal private-sector privacy law.`,
    blocks: [
      {
        heading: 'What we collect',
        paragraphs: [
          'The only personal information this website collects is what you choose to send through the "Get a quote" form: your name, email address, phone number (optional), the service you are interested in (optional) and your message, which may include your property address.',
          `This site does not use analytics, advertising pixels, social-media embeds, chat widgets or tracking cookies. ${legalMeta.host[0].toUpperCase() + legalMeta.host.slice(1)} may keep standard server logs (IP address, browser type, pages requested, time of request) for security and to keep the site running; we do not use those logs to identify or profile visitors.`,
        ],
      },
      {
        heading: 'Why we collect it and how we use it',
        paragraphs: [
          'We use quote-form information for one purpose: to contact you about the work you asked about and, if you go ahead, to carry out that work. We do not sell, rent or trade personal information, we do not add you to marketing lists, and we do not send promotional messages unless you have asked for them.',
        ],
      },
      {
        heading: 'Who processes it',
        paragraphs: [
          `Form submissions are received and stored on our behalf by ${legalMeta.host}, which delivers them to us. Depending on the provider, that data may be stored on servers located outside Canada, where it is subject to the laws of that country. We do not share personal information with anyone else unless the law requires it or you ask us to.`,
        ],
      },
      {
        heading: 'How long we keep it',
        paragraphs: [
          'We keep quote requests for as long as needed to respond to them. If you become a customer, we keep the relevant details for the life of that relationship and for any period required for tax and business records. You can ask us to delete a request at any time (see "Your choices" below).',
        ],
      },
      {
        heading: 'How we protect it',
        paragraphs: [
          'The website is served over HTTPS, so information you send through the form is encrypted in transit. Submissions are accessible only to the people at our company who respond to them. No method of transmission or storage is completely secure, so we cannot guarantee absolute security; we take reasonable steps appropriate to the sensitivity of the information, which is limited to contact details and a description of landscaping work.',
        ],
      },
      {
        heading: 'Cookies and local storage',
        paragraphs: [
          'This site sets no tracking cookies. It stores one consent record in your browser so we can remember your cookie preferences. Full details, including how to change your choice, are in the Cookie Policy.',
        ],
      },
      {
        heading: 'Your choices and rights',
        paragraphs: [
          `You may ask what personal information we hold about you, ask us to correct it, withdraw consent to its use, or ask us to delete it. To do so, ${contactLine}, and say that your request is about privacy. We will respond within the time required by PIPEDA. If you are not satisfied with our response, you may contact the Office of the Privacy Commissioner of Canada.`,
          'Sending a quote request is entirely voluntary. If you would rather not use the form, you can call us instead.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'If we change this policy, we will post the new version here and update the "last updated" date at the top. If a change materially affects how we use personal information already collected, we will take reasonable steps to let affected people know.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [`Questions about privacy: ${contactLine}.`],
      },
    ],
  },
  {
    id: 'terms',
    path: '/terms/',
    title: 'Terms of Use',
    navLabel: 'Terms of Use',
    description: `The terms that apply to using the ${company.name} website.`,
    intro: `These terms apply to your use of this website. By using the site you agree to them. They cover the website only; any landscaping work is governed by the written quote or agreement between you and ${legalMeta.entity}, not by these terms.`,
    blocks: [
      {
        heading: 'Informational content',
        paragraphs: [
          'We try to keep the site accurate and current, but it is provided for general information only. Service availability, scope and price are confirmed in a written quote for your specific property, not by anything on this site.',
        ],
      },
      {
        heading: 'Quote requests',
        paragraphs: [
          'Sending the quote form does not create a contract and does not guarantee availability. A quote becomes binding only when it is accepted in writing by both parties.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          `The text, photographs and design of this site belong to ${legalMeta.entity} or are used with permission. You may view and share the site for personal, non-commercial purposes. Do not copy, reproduce or reuse its content for another business without written permission.`,
        ],
      },
      {
        heading: 'Acceptable use',
        paragraphs: [
          'Do not attempt to interfere with the site or its hosting, probe it for vulnerabilities, scrape it automatically, or submit false, abusive or unlawful content through the form.',
        ],
      },
      {
        heading: 'Third-party links',
        paragraphs: [
          'The site links to third-party sites such as Google Maps. Those sites are not under our control and have their own terms and privacy policies. A link is not an endorsement.',
        ],
      },
      {
        heading: 'Service availability',
        paragraphs: [
          'We aim to keep the site available but do not guarantee uninterrupted access. We may change, suspend or withdraw any part of it without notice.',
        ],
      },
      {
        heading: 'Disclaimers and limitation of liability',
        paragraphs: [
          'The site is provided "as is". To the extent permitted by law, we make no warranties about it and are not liable for any loss arising from your use of it or reliance on its content. Nothing in these terms limits rights you have under applicable consumer protection law, or liability that cannot be excluded by law.',
        ],
      },
      {
        heading: 'Changes to these terms',
        paragraphs: ['We may update these terms from time to time. The current version is always the one posted here, with the date shown at the top.'],
      },
      {
        heading: 'Governing law',
        paragraphs: ['These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable there, and any dispute about them will be heard by the courts of Ontario.'],
      },
      {
        heading: 'Contact',
        paragraphs: [`Questions about these terms: ${contactLine}.`],
      },
    ],
  },
  {
    id: 'cookies',
    path: '/cookies/',
    title: 'Cookie Policy',
    navLabel: 'Cookie Policy',
    description: `Which cookies and browser storage the ${company.name} website uses, and how to change your preferences.`,
    intro: 'Cookies are small files a website stores in your browser; "local storage" is a similar browser feature that websites can use to remember things between visits. This policy lists exactly what this site uses. It is short because the site uses very little.',
    blocks: [
      {
        heading: 'What this site uses',
        paragraphs: ['This is the complete inventory as of the date at the top of this page.'],
        list: [
          'Strictly necessary: one first-party local-storage entry named "ll-consent" that records your cookie preferences (your choice, the date, and the version of this policy you saw). Set by this site. Kept for 12 months, after which you are asked again. Contains no personal information.',
          `Strictly necessary: ${legalMeta.host} may set cookies needed to serve the site securely and to protect the quote form from automated spam. These are set by the provider, not by us, and are not used to track you across other sites.`,
          'Analytics: none. This site does not use Google Analytics or any other analytics service.',
          'Functional: none.',
          'Marketing / advertising: none. No advertising cookies, pixels or social-media trackers are loaded.',
        ],
      },
      {
        heading: 'Your consent and preferences',
        paragraphs: [
          'On your first visit the site shows a cookie notice with three equal choices: accept all, reject non-essential, or manage preferences by category. Your choice is stored in your browser and remembered on later visits, so the notice does not reappear until the stored choice expires (12 months) or this policy materially changes.',
          'Because the site currently uses no analytics, functional or marketing technologies, accepting or rejecting those categories changes nothing today. Your choice is still recorded and will be respected if such a technology is ever added: nothing non-essential will load without the matching consent.',
          'You can change or withdraw your choice at any time using "Cookie preferences" in the footer of every page.',
        ],
      },
      {
        heading: 'Managing cookies in your browser',
        paragraphs: [
          'You can also block or delete cookies and site data in your browser settings. The site will still work; the only effect is that the cookie notice will appear again on your next visit.',
        ],
      },
      {
        heading: 'Third-party sites',
        paragraphs: ['If you follow a link from this site to Google Maps or any other site, that site applies its own cookie policy.'],
      },
      {
        heading: 'Contact',
        paragraphs: [`Questions about cookies: ${contactLine}.`],
      },
    ],
  },
  {
    id: 'accessibility',
    path: '/accessibility/',
    title: 'Accessibility Statement',
    navLabel: 'Accessibility',
    description: `How the ${company.name} website is built to be usable by everyone, and how to tell us if something is in your way.`,
    intro: `${legalMeta.entity} wants everyone to be able to use this website. It is designed and built with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA as the baseline. We are a small private business in Ontario and we work toward the Accessibility for Ontarians with Disabilities Act (AODA) principles of independence, dignity, integration and equal opportunity; this statement describes what the site does, not a formal certification.`,
    blocks: [
      {
        heading: 'What the site does',
        paragraphs: ['On this site you can:'],
        list: [
          'use everything with a keyboard alone, including the menu, the cookie notice and preferences dialog and the quote form, with a visible focus indicator and a "skip to content" link;',
          'read all text at a contrast ratio that meets WCAG AA against its background;',
          'use a screen reader: pages use landmarks and a logical heading order, form fields have visible labels, errors are announced, and images have text descriptions;',
          'turn off motion: if your device is set to reduce motion, the animated hero becomes a still photograph and nothing on the site depends on animation;',
          'zoom to 200% and use the site on a phone without losing content or needing to scroll sideways;',
          'understand the content in plain language.',
        ],
      },
      {
        heading: 'Known limitations',
        paragraphs: [
          'The hero photograph changes as you scroll. The change is decorative; the text it carries is available in full without it. If you find any other part of the site difficult, please tell us.',
        ],
      },
      {
        heading: 'Feedback and alternative formats',
        paragraphs: [
          `If any part of this site is hard to use, or you would like the information on it in another format, ${contactLine}, and say that your message is about accessibility. We will do our best to help promptly and to fix the issue.`,
        ],
      },
      {
        heading: 'Review',
        paragraphs: [`This statement was last reviewed on ${legalMeta.updated} and is reviewed whenever the site changes.`],
      },
    ],
  },
] as const;

export const legalByPath = (path: string) => legalDocs.find((d) => d.path === path);
