import { ArrowRight } from '@phosphor-icons/react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { company, cta, heroPlates } from '../content/site';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The hero is one yard, photographed twice from the same spot: neglected, then maintained.
 *
 * On every device the section is taller than the screen and the picture is sticky for the whole
 * run. As the page is scrolled, the maintained plate is revealed over the neglected one by a
 * clip-path that sweeps left to right like a mower pass, with a thin bright cut line on the
 * leading edge. One scroll value drives everything (scrub), so the reader controls the
 * transformation and can stop on any frame. The copy fades out over the last third so the
 * finished yard gets the frame to itself.
 *
 * Phones scrub too (the press-and-drag handle was removed 2026-08-30 on the client's call) — and
 * because a landscape photograph cannot cover a portrait screen without losing most of the yard,
 * small screens show the whole plate letterboxed on the page's ink instead of a crop (see
 * sections.css), with the copy in the space beneath it.
 *
 * No reduced-motion branch, on the client's explicit call (2026-08-30): the wipe is scrubbed, so
 * it only moves exactly as far and as fast as the visitor's own scroll does — direct
 * manipulation, not autonomous motion.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom bottom', scrub: 0.5 },
      });
      tl.fromTo('.hero__stage', { '--cut': '0%' }, { '--cut': '100%', duration: 1 }, 0)
        .to('.hero__copy', { opacity: 0, y: -16, duration: 0.3 }, 0.7);
    },
    { scope: ref }
  );

  return (
    <section id="top" ref={ref} className="hero" aria-label="Introduction">
      <div className="hero__stage">
        <img
          className="hero__plate hero__before"
          src={heroPlates.before.src}
          srcSet={heroPlates.before.srcSet}
          sizes="100vw"
          width={heroPlates.width}
          height={heroPlates.height}
          alt={heroPlates.before.alt}
          fetchPriority="high"
          decoding="sync"
        />
        <img
          className="hero__plate hero__after"
          src={heroPlates.after.src}
          srcSet={heroPlates.after.srcSet}
          sizes="100vw"
          width={heroPlates.width}
          height={heroPlates.height}
          alt={heroPlates.after.alt}
          fetchPriority="high"
          decoding="sync"
        />
        <div className="hero__scrim" aria-hidden="true" />

        <div className="shell hero__copy">
          <h1 className="display-xl">{company.headline}</h1>
          <p className="lede">{company.sub}</p>
          <a className="btn" href={cta.href}>
            {cta.label}
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
