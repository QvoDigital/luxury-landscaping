import { ArrowRight, CaretDown } from '@phosphor-icons/react';
import { useRef } from 'react';
import { BackLink } from '../components/BackLink';
import { CookieConsent } from '../components/CookieConsent';
import { Footer } from '../components/Footer';
import { LawnJourney } from '../components/LawnJourney';
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
          {/* With a banner, the header is one photo-filled rectangle: the opening words sit on
              the finished work, and the rectangle ends where the service rows begin. */}
          <header className={area.banner ? 'menu__head menu__head--wall' : 'menu__head'}>
            {area.banner && (
              <div className="menu__wall" aria-hidden="true">
                <img
                  src={area.banner.src}
                  srcSet={area.banner.srcSet}
                  sizes="(max-width: 1320px) 100vw, 1320px"
                  alt=""
                  width="1400"
                  height="781"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            )}
            <BackLink />
            <h1 className="display-l wipe">{area.title}.</h1>
            <p className="lede reveal">{area.lede}</p>
          </header>

          <ul className="menu__rows menu__body rule">
            {area.rows.map((r) =>
              r.detail ? (
                // Rows with a longer story open on press. <details>, not state: it works without
                // JavaScript and the prerendered shell prints the full text either way.
                <li key={r.name} className="reveal">
                  <details className="menu__disclose">
                    <summary>
                      <span className="menu__disclose-head">
                        <h2>{r.name}</h2>
                        <CaretDown className="menu__caret" size={18} weight="bold" aria-hidden="true" />
                      </span>
                      <p>{r.text}</p>
                    </summary>
                    <p className="menu__detail">{r.detail}</p>
                  </details>
                </li>
              ) : (
                <li key={r.name} className="reveal">
                  <h2>{r.name}</h2>
                  <p>{r.text}</p>
                </li>
              )
            )}
          </ul>

          {area.id === 'lawn-care' ? <LawnJourney area={area} /> : <ServiceDemo area={area} />}

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
