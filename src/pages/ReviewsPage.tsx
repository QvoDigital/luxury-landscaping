import { ArrowRight, ArrowSquareOut } from '@phosphor-icons/react';
import { useRef } from 'react';
import { BackLink } from '../components/BackLink';
import { CookieConsent } from '../components/CookieConsent';
import { Footer } from '../components/Footer';
import { Masthead } from '../components/Masthead';
import { contact, cta, reviews } from '../content/site';
import { useReveal } from '../lib/reveal';

/**
 * /reviews/ (2026-08-24): the reviews in full, where the home page shows one. Quotes are verbatim
 * from the public Google listing and the page says so, with the listing one click away so a
 * visitor can check them rather than take our word for it.
 *
 * No Review or AggregateRating structured data. The quotes are real, but we hold no ratings or
 * dates for them, and self-hosted review markup for your own business is the kind of thing search
 * engines discount or penalise. The link to the listing is the honest version.
 */
export default function ReviewsPage() {
  const main = useRef<HTMLElement>(null);
  useReveal(main);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main" ref={main} tabIndex={-1} className="menu section">
        <div className="shell">
          <header className="menu__head">
            <BackLink href="/#reviews" />
            <h1 className="display-l wipe">What homeowners say.</h1>
            <p className="lede reveal">
              Every quote below is taken word for word from our public Google listing. Nothing here is written by us.
            </p>
            <a className="reviews__all reveal" href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">
              Read them on Google
              <ArrowSquareOut size={16} aria-hidden="true" />
            </a>
          </header>

          <ul className="reviews__page rule">
            {reviews.map((r) => (
              <li key={r.quote} className="reveal">
                <figure>
                  <blockquote>
                    <p>“{r.quote}”</p>
                  </blockquote>
                  <figcaption>{r.name ? `${r.name}, Google review` : 'Google review'}</figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <div className="menu__foot rule">
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
