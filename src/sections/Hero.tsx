import { ArrowRight, ArrowsOutLineHorizontal } from '@phosphor-icons/react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { company, cta, heroPlates } from '../content/site';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Phones: narrow viewport with a touch pointer. The scroll-scrubbed hero is replaced by a drag handle. */
const PHONE_QUERY = '(max-width: 699px) and (pointer: coarse)';
const DRAG_START = 18; // % of the maintained lawn shown before the visitor touches anything

function usePhone() {
  const [phone, setPhone] = useState(() => typeof window !== 'undefined' && window.matchMedia(PHONE_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(PHONE_QUERY);
    const onChange = () => setPhone(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return phone;
}

/**
 * The hero is one yard, photographed twice from the same spot: neglected, then maintained.
 *
 * Desktop: the section is 260vh tall; the picture is sticky for the whole run. As the page is
 * scrolled, the maintained plate is revealed over the neglected one by a clip-path that sweeps
 * left to right like a mower pass, with a thin bright cut line on the leading edge. One scroll
 * value drives everything (scrub), so the reader controls the transformation and can stop on
 * any frame. The copy fades out over the last third so the finished yard gets the frame to itself.
 *
 * Phone: scroll-scrubbing is unreliable on mobile browsers, so the section collapses to one
 * screen and the cut line becomes a handle. Press, hold and drag it sideways to mow the lawn.
 * Only the handle captures the touch, so vertical page scrolling keeps working everywhere else.
 *
 * Reduced motion: the maintained plate is shown static and the section collapses to one screen.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const phone = usePhone();

  useGSAP(
    () => {
      if (phone) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom bottom', scrub: 0.5 },
      });
      tl.fromTo('.hero__stage', { '--cut': '0%' }, { '--cut': '100%', duration: 1 }, 0)
        .to('.hero__copy', { opacity: 0, y: -16, duration: 0.3 }, 0.7);
    },
    { scope: ref, dependencies: [phone], revertOnUpdate: true }
  );

  return (
    <section id="top" ref={ref} className={`hero${phone ? ' hero--drag' : ''}`} aria-label="Introduction">
      <div className="hero__stage" style={phone ? ({ '--cut': `${DRAG_START}%` } as React.CSSProperties) : undefined}>
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

        {phone && <DragHandle />}

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

/**
 * The handle sits on the cut line. Pointer capture keeps the drag alive if the finger wanders
 * off the knob; `touch-action: none` (CSS) stops the browser from turning the drag into a scroll.
 * The value is written straight to the --cut custom property, so there is no React re-render per
 * move and the clip-path tracks the finger at frame rate.
 */
function DragHandle() {
  const knob = useRef<HTMLButtonElement>(null);
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState(DRAG_START); // for aria-valuenow + keyboard only

  const stage = () => knob.current?.parentElement as HTMLElement | null;

  const write = (pct: number) => {
    const v = Math.min(100, Math.max(0, pct));
    stage()?.style.setProperty('--cut', `${v}%`);
    return v;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = knob.current;
    const host = stage();
    if (!el || !host) return;
    el.setPointerCapture(e.pointerId);
    el.classList.add('is-dragging');
    setTouched(true);
    const rect = host.getBoundingClientRect();
    const move = (ev: PointerEvent) => {
      if (ev.pointerId !== e.pointerId) return;
      write(((ev.clientX - rect.left) / rect.width) * 100);
    };
    const up = (ev: PointerEvent) => {
      if (ev.pointerId !== e.pointerId) return;
      el.classList.remove('is-dragging');
      const cur = parseFloat(host.style.getPropertyValue('--cut')) || DRAG_START;
      setValue(Math.round(cur));
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = e.shiftKey ? 10 : 4;
    let next: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = value + step;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = value - step;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = 100;
    if (next === null) return;
    e.preventDefault();
    setTouched(true);
    setValue(write(next));
  };

  return (
    <>
      <button
        ref={knob}
        type="button"
        className="hero__handle"
        role="slider"
        aria-label="Reveal the maintained lawn"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={`${value}% maintained`}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
      >
        <ArrowsOutLineHorizontal size={22} weight="bold" aria-hidden="true" />
      </button>
      <p className={`hero__hint${touched ? ' is-hidden' : ''}`} aria-hidden="true">
        Hold &amp; drag to mow
      </p>
    </>
  );
}
