import { ArrowRight } from '@phosphor-icons/react';
import { useRef } from 'react';
import { CookieConsent } from '../components/CookieConsent';
import { Footer } from '../components/Footer';
import { Masthead } from '../components/Masthead';
import { contact, cta, team } from '../content/site';
import { useReveal } from '../lib/reveal';

/**
 * /team/ is its own document, like /faq/. Two people, two columns, no portraits until the client
 * supplies real ones. The copy is short on purpose: the reviews on the home page are the proof.
 */
export default function TeamPage() {
  const main = useRef<HTMLElement>(null);
  useReveal(main);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main" ref={main} tabIndex={-1} className="team section">
        <div className="shell">
          <div className="team__head">
            <h1 className="display-l reveal">The people who show up.</h1>
            <p className="lede reveal">A small Mississauga crew, working across the GTA.</p>
          </div>
          <ul className="team__grid">
            {team.map((p) => (
              <li key={p.name} className="team__person reveal">
                <h2>{p.name}</h2>
                <p className="team__role">{p.role}</p>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
          <div className="team__foot reveal">
            <a className="btn" href={cta.href}>
              {cta.label}
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a className="team__call" href={contact.phoneHref}>
              or call {contact.phone}
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
