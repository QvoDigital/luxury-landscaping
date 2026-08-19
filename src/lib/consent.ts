import { useEffect, useState } from 'react';

/**
 * Cookie-consent store.
 *
 * One first-party localStorage entry, "ll-consent", holding the visitor's choice per category,
 * when it was made, and the policy version it was made against. Consent expires after 12 months
 * or when CONSENT_VERSION is bumped (do that whenever the cookie policy or the set of categories
 * materially changes), and the notice is shown again.
 *
 * Today the site loads nothing non-essential, so the categories gate nothing. They exist so that
 * if analytics or any other third-party technology is ever added, it is wired through
 * `hasConsent(category)` and cannot load without the matching choice.
 */

export const CONSENT_KEY = 'll-consent';
export const CONSENT_VERSION = 1;
const TTL_MS = 365 * 24 * 60 * 60 * 1000;

export type Category = 'analytics' | 'functional' | 'marketing';
export const categories: readonly { id: Category; label: string; body: string }[] = [
  {
    id: 'analytics',
    label: 'Analytics',
    body: 'Would measure how the site is used, for example which pages are visited. Not currently used on this site.',
  },
  {
    id: 'functional',
    label: 'Functional',
    body: 'Would remember choices such as a preferred language or region. Not currently used on this site.',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    body: 'Would be used to show advertising or measure ad campaigns. Not currently used on this site.',
  },
];

export type Choices = Record<Category, boolean>;
export type ConsentRecord = { version: number; at: number; choices: Choices };

export const allOff: Choices = { analytics: false, functional: false, marketing: false };
export const allOn: Choices = { analytics: true, functional: true, marketing: true };

const EVENT = 'll:consent';
const OPEN_EVENT = 'll:consent-open';

export function readConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const rec = JSON.parse(raw) as ConsentRecord;
    if (rec.version !== CONSENT_VERSION) return null;
    if (Date.now() - rec.at > TTL_MS) return null;
    return rec;
  } catch {
    return null;
  }
}

export function writeConsent(choices: Choices): ConsentRecord {
  const rec: ConsentRecord = { version: CONSENT_VERSION, at: Date.now(), choices };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(rec));
  } catch {
    /* storage blocked: choice applies for this page only */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: rec }));
  return rec;
}

/** Gate for any future non-essential script: `if (hasConsent('analytics')) load()`. */
export function hasConsent(category: Category): boolean {
  return readConsent()?.choices[category] ?? false;
}

/** Footer "Cookie preferences" and any other control call this to reopen the dialog. */
export function openPreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function useConsent() {
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [ready, setReady] = useState(false);
  const [openRequested, setOpenRequested] = useState(false);

  useEffect(() => {
    setRecord(readConsent());
    setReady(true);
    const onChange = (e: Event) => setRecord((e as CustomEvent<ConsentRecord>).detail);
    const onOpen = () => setOpenRequested(true);
    window.addEventListener(EVENT, onChange);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  return { record, ready, openRequested, clearOpenRequest: () => setOpenRequested(false) };
}
