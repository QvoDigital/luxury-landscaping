import { ArrowRight } from '@phosphor-icons/react';
import { useRef } from 'react';
import { BackLink } from '../components/BackLink';
import { CookieConsent } from '../components/CookieConsent';
import { Footer } from '../components/Footer';
import { Masthead } from '../components/Masthead';
import { serviceAreas } from '../content/services';
import { contact, cta } from '../content/site';
import { useHashScroll } from '../lib/hash';
import { useReveal } from '../lib/reveal';

/**
 * /services/: three short groups. Each is a title, one line, and rows of "name: one sentence".
 * Nothing nested, nothing numbered. The whole page can be read in under a minute.
 */
export default function ServicesPage() {
  const main = useRef<HTMLElement>(null);
  useReveal(main);
  useHashScroll();

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main" ref={main} tabIndex={-1} className="menu section">
        <div className="shell">
          <header className="menu__head">
            <BackLink />
            <h1 className="display-l reveal">What we do.</h1>
            <p className="lede reveal">Landscaping, lawn care and snow removal across Mississauga and the GTA.</p>
          </header>

          {serviceAreas.map((area) => (
            <section key={area.id} id={area.id} className="menu__group" aria-labelledby={`${area.id}-heading`}>
              <div className="menu__title reveal">
                <h2 id={`${area.id}-heading`} className="display-m">
                  {area.title}
                </h2>
                <p>{area.lede}</p>
              </div>
              <ul className="menu__rows">
                {area.rows.map((r) => (
                  <li key={r.name} className="reveal">
                    <h3>{r.name}</h3>
                    <p>{r.text}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <div className="menu__foot reveal">
            <p>
              Want us to look after the whole season?{' '}
              <a href="/packages/">
                See the lawn care programs
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </a>
            </p>
            <div className="menu__actions">
              <a className="btn" href={cta.href}>
                {cta.label}
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </a>
              <a className="menu__call" href={contact.phoneHref}>
                or call {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
