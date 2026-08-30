import { ArrowRight } from '@phosphor-icons/react';
import { cta, reviews } from '../content/site';

/**
 * Social proof on the home page: the first three Google reviews and the way through to the rest
 * at /reviews/. With the quote form on its own page (2026-08-30), this band also carries the home
 * page's closing "Get a quote" button — the reviews make the case and the button sits right where
 * the case has just been made.
 */
export function Reviews() {
  const featured = reviews.slice(0, 3);

  return (
    <section id="reviews" className="reviews section" aria-labelledby="reviews-heading">
      <div className="shell reviews__grid">
        <div className="reviews__head">
          <h2 id="reviews-heading" className="display-l wipe">
            What homeowners say.
          </h2>
          <a className="reviews__more reveal" href="/reviews/">
            Read the reviews
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
          <a className="btn reveal" href={cta.href}>
            {cta.label}
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>
        <ul className="reviews__quotes">
          {featured.map((r) => (
            <li key={r.quote} className="reveal">
              <figure className="reviews__featured">
                <blockquote>
                  <p>“{r.quote}”</p>
                </blockquote>
                <figcaption>{r.name ? `${r.name}, Google review` : 'Google review'}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
