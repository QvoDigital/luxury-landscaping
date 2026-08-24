import { ArrowRight } from '@phosphor-icons/react';
import { reviews } from '../content/site';

/**
 * Social proof on the home page: the first Google review, in full, and the way through to the rest
 * at /reviews/. One quote rather than all three, so the page that holds them is worth opening —
 * and so this band stays a beat between the Services doors and the Programs ledger rather than a
 * third list to read.
 */
export function Reviews() {
  const [featured] = reviews;

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
        </div>
        <figure className="reviews__featured reveal">
          <blockquote>
            <p>“{featured.quote}”</p>
          </blockquote>
          <figcaption>{featured.name}, Google review</figcaption>
        </figure>
      </div>
    </section>
  );
}
