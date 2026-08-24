import { ArrowRight } from '@phosphor-icons/react';
import { programs } from '../content/services';

/**
 * The season programs, on their own band between the reviews and the quote form (2026-08-24).
 * Kept away from the Services doors on purpose: a program is the whole season handed over, not
 * another item on the list, and the reviews sit between the two so they never read as one section.
 *
 * Its own shape, too. Services is a row of doors and Reviews is a sticky heading beside a column
 * of quotes, so this band is a ledger: heading across the top, then one full-width rule-separated
 * row per program. Three bands, three structures.
 */
export function Programs() {
  return (
    <section id="programs" className="programs section" aria-labelledby="programs-heading">
      <div className="shell">
        <div className="programs__head">
          <div>
            <h2 id="programs-heading" className="display-l wipe">
              Or hand us the season.
            </h2>
            <p className="reveal">Four lawn care programs, from a solid start to the most care we offer.</p>
          </div>
          <a className="programs__all reveal" href="/programs/">
            Compare the programs
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>

        <ul className="programs__list rule">
          {programs.map((p) => (
            <li key={p.id} className="reveal">
              <a href={`/programs/#${p.id}`}>
                <span className="programs__name">{p.name}</span>
                <span className="programs__visits">{p.visits}</span>
                <span className="programs__tagline">{p.tagline}</span>
                <ArrowRight className="programs__arrow" size={18} weight="bold" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
