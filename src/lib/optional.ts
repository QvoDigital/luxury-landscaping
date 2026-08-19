import { readConsent, type Category, type ConsentRecord } from './consent';

/**
 * The one place any non-essential, consent-gated integration is registered.
 *
 * Each entry names the category it needs and a `load` function that injects it. `apply()` runs
 * on page load and again whenever consent changes, loads anything newly allowed, and flags the
 * page with `data-consent="analytics functional"` so the current state is observable in the DOM
 * (and testable). Nothing in this list loads before the matching choice is stored.
 *
 * The registry is empty because the site uses no optional technologies today. To add one later:
 *
 *   { id: 'plausible', category: 'analytics', load: () => { const s = document.createElement('script');
 *     s.src = 'https://plausible.io/js/script.js'; s.defer = true; s.dataset.domain = 'luxurylandscaping.ca';
 *     document.head.appendChild(s); } }
 *
 * ...then describe it in src/content/legal.ts and bump CONSENT_VERSION in consent.ts.
 */
export type OptionalIntegration = { id: string; category: Category; load: () => void };

export const optionalIntegrations: readonly OptionalIntegration[] = [];

const loaded = new Set<string>();

export function applyConsent(record: ConsentRecord | null = readConsent()) {
  const choices = record?.choices;
  const allowed = choices ? (Object.keys(choices) as Category[]).filter((c) => choices[c]) : [];
  document.documentElement.dataset.consent = allowed.join(' ');

  for (const item of optionalIntegrations) {
    if (loaded.has(item.id)) continue;
    if (allowed.includes(item.category)) {
      item.load();
      loaded.add(item.id);
    }
  }
}
