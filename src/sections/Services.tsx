import { serviceGroups } from '../content/site';

/**
 * Four groups, four columns, nineteen services. No photos, no descriptions: the names are the
 * information, and the reader can scan all of it in one look.
 */
export function Services() {
  return (
    <section id="services" className="services section" aria-labelledby="services-heading">
      <div className="shell">
        <h2 id="services-heading" className="display-l reveal">
          Everything a property needs.
        </h2>
        <p className="lede reveal">Residential and commercial, across Mississauga and the GTA.</p>
        <div className="services__grid">
          {serviceGroups.map((g) => (
            <div key={g.id} className="services__group reveal">
              <h3>{g.title}</h3>
              <ul>
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
