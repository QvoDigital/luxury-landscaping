import { ArrowSquareOut } from '@phosphor-icons/react';
import { contact, reviews } from '../content/site';

/** Three public Google reviews, verbatim. Heading on the left, quotes stacked on the right. */
export function Reviews() {
  return (
    <section id="reviews" className="reviews section" aria-labelledby="reviews-heading">
      <div className="shell reviews__grid">
        <div className="reviews__head reveal">
          <h2 id="reviews-heading" className="display-l">
            What homeowners say.
          </h2>
          <a className="reviews__all" href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">
            Read more on Google
            <ArrowSquareOut size={16} aria-hidden="true" />
          </a>
        </div>
        <ul className="reviews__list">
          {reviews.map((r) => (
            <li key={r.name} className="reveal">
              <figure>
                <blockquote>
                  <p>“{r.quote}”</p>
                </blockquote>
                <figcaption>{r.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
