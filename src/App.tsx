import { useRef } from 'react';
import { CookieConsent } from './components/CookieConsent';
import { Footer } from './components/Footer';
import { Masthead } from './components/Masthead';
import { useHashScroll } from './lib/hash';
import { useReveal } from './lib/reveal';
import { Hero } from './sections/Hero';
import { Reviews } from './sections/Reviews';
import { Services } from './sections/Services';

export default function App() {
  const main = useRef<HTMLElement>(null);
  useReveal(main);
  useHashScroll();

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main" ref={main} tabIndex={-1}>
        <Hero />
        <Services />
        <Reviews />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
