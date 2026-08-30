import { useRef } from 'react';
import { CookieConsent } from '../components/CookieConsent';
import { Footer } from '../components/Footer';
import { Masthead } from '../components/Masthead';
import { useReveal } from '../lib/reveal';
import { Contact } from '../sections/Contact';

/**
 * /quote/ (2026-08-30): the quote form on its own page. Every "Get a quote" button on the site
 * lands here, so the form is the whole page rather than the last band of the home page — the
 * visitor who pressed the button gets the form and nothing else to scroll past.
 */
export default function QuotePage() {
  const main = useRef<HTMLElement>(null);
  useReveal(main);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main" ref={main} tabIndex={-1} className="quote">
        <Contact />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
