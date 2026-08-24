import { useRef } from 'react';
import { CookieConsent } from './components/CookieConsent';
import { Footer } from './components/Footer';
import { Masthead } from './components/Masthead';
import { useHashScroll } from './lib/hash';
import { useReveal } from './lib/reveal';
import { Contact } from './sections/Contact';
import { Hero } from './sections/Hero';
import { Programs } from './sections/Programs';
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
        <Programs />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
