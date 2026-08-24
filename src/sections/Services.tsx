import { ArrowRight } from '@phosphor-icons/react';
import { serviceAreas } from '../content/services';

/**
 * Services on the home page: one heading over three doors, one per service page. The heading
 * carries the word so the band is unmistakable; the doors carry the detail. The season programs
 * are deliberately not here — they are their own band further down, because handing over a season
 * is a different decision from booking a job.
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
              <h3 className="display-m">{area.title}</h3>
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
