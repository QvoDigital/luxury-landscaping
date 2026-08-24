import { ArrowRight } from '@phosphor-icons/react';
import { useRef } from 'react';
import { BackLink } from '../components/BackLink';
import { CookieConsent } from '../components/CookieConsent';
import { Footer } from '../components/Footer';
import { Masthead } from '../components/Masthead';
import { ServiceDemo } from '../components/ServiceDemo';
import type { ServiceArea } from '../content/services';
import { serviceAreas } from '../content/services';
import { contact, cta } from '../content/site';
import { useReveal } from '../lib/reveal';

/**
 * One page per service area (2026-08-24, replacing the single /services/ list). Title, one line,
 * and rows of "name: one sentence" — the whole page reads in well under a minute. The foot
 * carries the other two areas, so a visitor who opened the wrong one is one click from the right
 * one without going back to the home page.
 *
 * Between the two sits the demonstration: one animation per row of the list above, chosen by the
 * visitor. It repeats what the words already said, so nothing is lost if it never runs.
 */
export default function ServiceAreaPage({ area }: { area: ServiceArea }) {
  const main = useRef<HTMLElement>(null);
  useReveal(main);

  const others = serviceAreas.filter((a) => a.id !== area.id);

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
            <h1 className="display-l wipe">{area.title}.</h1>
            <p className="lede reveal">{area.lede}</p>
          </header>

          <ul className="menu__rows menu__body rule">
            {area.rows.map((r) => (
              <li key={r.name} className="reveal">
                <h2>{r.name}</h2>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>

          <ServiceDemo area={area} />

          <div className="menu__foot rule">
            <nav className="menu__more reveal" aria-label="Other services">
              <h2>The rest of what we do</h2>
              <ul>
                {others.map((o) => (
                  <li key={o.id}>
                    <a href={o.path}>
                      {o.title}
                      <ArrowRight size={16} weight="bold" aria-hidden="true" />
                    </a>
                    <span>{o.door}</span>
                  </li>
                ))}
              </ul>
            </nav>

            {area.id === 'lawn-care' && (
              <p className="reveal">
                Want us to look after the whole season?{' '}
                <a href="/programs/">
                  See the lawn care programs
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </a>
              </p>
            )}

            <div className="menu__actions reveal">
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
