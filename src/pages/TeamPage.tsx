import { ArrowRight } from '@phosphor-icons/react';
import { useRef } from 'react';
import { BackLink } from '../components/BackLink';
import { CookieConsent } from '../components/CookieConsent';
import { Footer } from '../components/Footer';
import { Masthead } from '../components/Masthead';
import { careers, contact, cta, team } from '../content/site';
import { useReveal } from '../lib/reveal';

/**
 * /team/ is its own document, like the service pages. Three people from the client's original site, no
 * portraits until the client supplies real ones, and the careers line from their Careers page.
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
            <BackLink href="/" />
            <h1 className="display-l wipe">The people behind the work.</h1>
            <p className="lede reveal">Based in Mississauga, working across the GTA.</p>
          </div>
          <ul className="team__grid rule">
            {team.map((p) => (
              <li key={p.name} className="team__person reveal">
                <h2>{p.name}</h2>
                <p className="team__role">{p.role}</p>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
          <section className="team__careers rule" aria-labelledby="careers-heading">
            <h2 id="careers-heading" className="reveal">
              {careers.heading}
            </h2>
            <p className="reveal">
              {careers.body} Email <a href={`mailto:${contact.careersEmail}`}>{contact.careersEmail}</a>.
            </p>
          </section>
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
