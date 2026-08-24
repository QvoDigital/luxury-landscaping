import { useRef } from 'react';
import { CookieConsent } from '../components/CookieConsent';
import { Footer } from '../components/Footer';
import { Masthead } from '../components/Masthead';
import { legalDocs, legalMeta, type LegalDoc } from '../content/legal';
import { openPreferences } from '../lib/consent';
import { useReveal } from '../lib/reveal';

/**
 * One component renders each of the four legal documents (/privacy/, /terms/, /cookies/,
 * /accessibility/). Each is its own HTML entry with its own title, description and canonical;
 * the left column lists the other documents and, on the cookie policy, the preferences control.
 */
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const main = useRef<HTMLElement>(null);
  useReveal(main);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main" ref={main} tabIndex={-1} className="legal section">
        <div className="shell legal__grid">
          <aside className="legal__side">
            <h1 className="display-l wipe">{doc.title}</h1>
            <p className="legal__meta reveal">Last updated {legalMeta.updated}</p>
            <nav aria-label="Legal pages" className="reveal">
              <ul>
                {legalDocs
                  .filter((d) => d.id !== doc.id)
                  .map((d) => (
                    <li key={d.id}>
                      <a href={d.path}>{d.title}</a>
                    </li>
                  ))}
                <li>
                  <button type="button" className="linklike" onClick={openPreferences}>
                    Cookie preferences
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          <article className="legal__body">
            <p className="legal__intro reveal">{doc.intro}</p>
            {doc.blocks.map((b) => (
              <section key={b.heading ?? b.paragraphs[0]} className="legal__block reveal">
                {b.heading && <h2>{b.heading}</h2>}
                {b.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
                {b.list && (
                  <ul>
                    {b.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
