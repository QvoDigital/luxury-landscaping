import { ArrowRight } from '@phosphor-icons/react';
import { useRef } from 'react';
import { BackLink } from '../components/BackLink';
import { CookieConsent } from '../components/CookieConsent';
import { Footer } from '../components/Footer';
import { Masthead } from '../components/Masthead';
import { programs } from '../content/services';
import { contact, cta } from '../content/site';
import { useHashScroll } from '../lib/hash';
import { useReveal } from '../lib/reveal';

/**
 * /programs/ (renamed from /packages/ 2026-08-24): the four programs side by side so they can be
 * compared at a glance. Name, visits, one line, and a short list of what is included. No prices:
 * the client publishes none. Back goes to the Programs band on the home page, not to Services —
 * a program is a season handed over, not one of the services.
 */
export default function ProgramsPage() {
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
            <BackLink href="/#programs" />
            <h1 className="display-l wipe">Lawn care programs.</h1>
            <p className="lede reveal">Pick how much of the season you want to hand to us. Every program starts with a walk of your lawn.</p>
          </header>

          <ul className="tiers rule">
            {programs.map((p) => (
              <li key={p.id} id={p.id} className="tier reveal">
                <h2 className="display-m">{p.name}</h2>
                <p className="tier__visits">{p.visits}</p>
                <p className="tier__tagline">{p.tagline}</p>
                <ul className="tier__includes">
                  {p.includes.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <a className="tier__link" href={`/?program=${encodeURIComponent(p.name)}#contact`}>
                  Ask about {p.name}
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <div className="menu__foot rule">
            <p className="reveal">
              Just need one job done?{' '}
              <a href="/#services">
                See what we do
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </a>
            </p>
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
