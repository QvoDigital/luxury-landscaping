import { ArrowClockwise } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { useLayoutEffect, useRef, useState } from 'react';
import type { ServiceArea } from '../content/services';
import { lawnStages } from './demo';

/**
 * The lawn care demonstration: one lawn, one continuous animation (2026-08-30, replacing the
 * per-service picker). Five plates of the same tired front lawn are stacked in the stage; each
 * treatment wipes the next plate over the last with the same left-to-right mower pass the site
 * uses everywhere, so the visitor watches a single lawn recover in the order the treatments
 * actually happen: dethatching, weed control, fertilization, overseeding.
 *
 * The step list beside the stage lights up as the animation reaches each treatment; pressing a
 * step jumps the lawn to that point and plays on from there. Scroll starts the first run, Replay
 * runs it again — on every device, with no reduced-motion opt-out (client's call, 2026-08-30).
 */
export function LawnJourney({ area }: { area: ServiceArea }) {
  const stage = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline | null>(null);
  const [active, setActive] = useState(-1); // -1: not started yet

  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const t = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });
      area.rows.forEach((_, k) => {
        t.addLabel(`step-${k}`, k === 0 ? 0.2 : '+=0.7');
        t.call(() => setActive(k));
        t.fromTo(`.journey__plate[data-step="${k + 1}"]`, { '--cut': '0%' }, { '--cut': '100%', duration: 1.6 });
      });
      tl.current = t;
    }, el);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            tl.current?.play(0);
            io.disconnect();
          }
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      ctx.revert();
      tl.current = null;
    };
  }, [area]);

  /** Jump the lawn to treatment i and keep playing from there. */
  const pick = (i: number) => {
    setActive(i);
    tl.current?.play(`step-${i}`);
  };

  const replay = () => {
    setActive(-1);
    tl.current?.play(0);
  };

  const row = active >= 0 ? area.rows[active] : null;

  return (
    <section className="demo" aria-labelledby="demo-heading">
      <div className="demo__head reveal">
        <h2 id="demo-heading">Watch it</h2>
        <p>One lawn, brought back one treatment at a time.</p>
      </div>

      <div className="demo__body">
        <ol className="demo__tabs journey__steps" aria-label="Lawn care treatments in order">
          {area.rows.map((r, i) => (
            <li key={r.name}>
              <button
                type="button"
                className="demo__tab"
                aria-current={i === active ? 'step' : undefined}
                data-done={active > i || undefined}
                onClick={() => pick(i)}
              >
                <span className="demo__tabnum">{i + 1}</span>
                {r.name}
              </button>
            </li>
          ))}
        </ol>

        <div className="demo__panel">
          <div className="demo__stage" ref={stage}>
            <figure className="journey" role="img" aria-label={lawnStages.alt}>
              {Array.from({ length: lawnStages.count }, (_, i) => (
                <img
                  key={i}
                  className={i === 0 ? 'demo__plate' : 'demo__plate journey__plate'}
                  data-step={i}
                  src={lawnStages.src(i, 1400)}
                  srcSet={`${lawnStages.src(i, 800)} 800w, ${lawnStages.src(i, 1400)} 1400w`}
                  sizes="(max-width: 899px) 100vw, 55vw"
                  alt=""
                  width="1400"
                  height="781"
                  loading="lazy"
                  decoding="async"
                />
              ))}
              <figcaption className="demo__badge demo__badge--before" aria-hidden="true">
                {row ? row.name : 'A tired lawn'}
              </figcaption>
            </figure>
          </div>

          <div className="demo__foot">
            <p aria-live="polite">{row ? row.text : 'Scroll to watch the season happen to one lawn.'}</p>
            <button type="button" className="demo__replay" onClick={replay}>
              <ArrowClockwise size={16} weight="bold" aria-hidden="true" />
              Replay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
