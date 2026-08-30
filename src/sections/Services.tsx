import { ArrowRight } from '@phosphor-icons/react';
import { serviceAreas } from '../content/services';

/**
 * Services on the home page: one heading over three doors, one per service page. The heading
 * carries the word so the band is unmistakable; the doors carry the detail. Landscaping and lawn
 * care each carry a small photo strip behind the title word (`area.wall`), a sliver of the work
 * itself under the word for it; snow removal shows its work in video on its own page instead.
 */
export function Services() {
  return (
    <section id="services" className="doors section" aria-labelledby="services-heading">
      <div className="shell">
        <h2 id="services-heading" className="display-l wipe">
          Services.
        </h2>
        <p className="lede reveal doors__lede">Everything a property needs, across Mississauga and the GTA.</p>
        <div className="doors__grid rule">
          {serviceAreas.map((area) => (
            <a key={area.id} href={area.path} className="door reveal">
              <div className="door__title">
                {area.wall && (
                  <img className="door__wall" src={area.wall.src} alt={area.wall.alt} loading="lazy" decoding="async" />
                )}
                <h3 className="display-m">{area.title}</h3>
              </div>
              <p>{area.door}</p>
              <span className="door__go">
                See {area.title.toLowerCase()}
                <ArrowRight size={20} weight="bold" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
