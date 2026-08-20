import { ArrowRight } from '@phosphor-icons/react';
import { useRef } from 'react';
import { BackLink } from '../components/BackLink';
import { CookieConsent } from '../components/CookieConsent';
import { Footer } from '../components/Footer';
import { Masthead } from '../components/Masthead';
import { contact, cta, faqs } from '../content/site';
import { useReveal } from '../lib/reveal';

/**
 * /faq/ is its own document, not a client-side route: it gets its own title, canonical and
 * FAQPage structured data, and it never loads the hero photography. Answers are plain paragraphs
 * under a shared rule; nothing is collapsed, so every answer is readable and indexable.
 */
export default function FaqPage() {
  const main = useRef<HTMLElement>(null);
  useReveal(main);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main" ref={main} tabIndex={-1} className="faq section">
        <div className="shell faq__grid">
          <div className="faq__head">
            <BackLink href="/" />
            <h1 className="display-l reveal">Questions.</h1>
            <p className="lede reveal">
              Anything not answered here, call <a href={contact.phoneHref}>{contact.phone}</a>.
            </p>
          </div>
          <dl className="faq__list">
            {faqs.map((f) => (
              <div key={f.q} className="faq__item reveal">
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="shell faq__foot reveal">
          <a className="btn" href={cta.href}>
            {cta.label}
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
