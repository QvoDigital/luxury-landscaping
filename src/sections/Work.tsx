import { work } from '../content/site';

/**
 * Five photographs of real jobs, from the business's own Google Business Profile uploads. One
 * large image and four smaller ones; no captions, because the client has not told us where or
 * when each job was. The pictures are the point.
 */
export function Work() {
  return (
    <section id="work" className="work section" aria-labelledby="work-heading">
      <div className="shell">
        <h2 id="work-heading" className="display-l reveal">
          Our work.
        </h2>
        <ul className="work__grid">
          {work.map((p, i) => (
            <li key={p.id} className="reveal">
              <img
                src={`/photos/work-${p.id}-1600.jpg`}
                srcSet={`/photos/work-${p.id}-800.jpg 800w, /photos/work-${p.id}-1600.jpg 1600w`}
                sizes={i === 0 ? '(max-width: 899px) 100vw, 60vw' : '(max-width: 899px) 50vw, 20vw'}
                width={p.width}
                height={p.height}
                alt={p.alt}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
