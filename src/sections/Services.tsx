import { ArrowRight } from '@phosphor-icons/react';

/**
 * The home page opens two doors: all services at /services/, the season programs at /packages/.
 * One heading, one line and one link each. The pages behind them carry the detail.
 */
export function Services() {
  return (
    <section id="services" className="doors section" aria-labelledby="services-heading">
      <div className="shell">
        <h2 id="services-heading" className="display-l reveal">
          Everything a property needs.
        </h2>
        <div className="doors__grid">
          <a href="/services/" className="door reveal">
            <h3 className="display-m">Services</h3>
            <p>Landscaping, lawn care and snow removal. One job or all of them.</p>
            <span className="door__go">
              See all services
              <ArrowRight size={20} weight="bold" aria-hidden="true" />
            </span>
          </a>
          <a href="/packages/" className="door reveal">
            <h3 className="display-m">Lawn care programs</h3>
            <p>Basic, Deluxe, Luxury or Consulting. We look after the whole season.</p>
            <span className="door__go">
              Compare the programs
              <ArrowRight size={20} weight="bold" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
