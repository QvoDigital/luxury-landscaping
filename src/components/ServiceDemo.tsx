import { ArrowClockwise } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { ServiceArea } from '../content/services';
import { demos } from './demo';

/**
 * "Watch it" — the service list, shown rather than described. One tab per row; the selected one
 * plays in the stage beside it.
 *
 * Landscaping and lawn care are before/after photographs of the same place, revealed by a
 * clip-path sweeping left to right — the hero's mower-pass gesture doing real work: the "after"
 * plate is wiped over the "before" one, so the change happens in place instead of cutting between
 * two pictures. Snow removal is video, because a plough is a moving object and a still of one
 * explains nothing; each clip declares its own `playbackRate`, since a truck at true speed crawls
 * in a stage this size.
 *
 * Scroll starts the first one: the timeline is built paused and an IntersectionObserver runs it the
 * first time the stage is on screen, so it begins as the visitor arrives rather than finishing
 * unseen. Every pick after that plays on the tap itself — nobody should have to find Replay to see
 * the thing they just asked for.
 *
 * No reduced-motion or Data Saver opt-out (client's call, 2026-08-30): the demonstrations run on
 * every device. If a browser still refuses a video's autoplay, "Tap to play" appears. Without
 * JavaScript the "before" plate and the poster frame still render, and the rows above already say
 * all of it in words.
 */
/**
 * Play a clip from the top.
 *
 * The videos are `preload="none"`, so until something asks for them their readyState is 0 and
 * `currentTime = 0` throws InvalidStateError — which used to abort this function before it ever
 * reached `play()`. That is why a freshly picked video sat on its poster until Replay was pressed:
 * by then the browser had loaded metadata and the seek was legal. So: seek only once metadata
 * exists, and reapply playbackRate on load, because a browser is free to reset it when it swaps
 * the source.
 */
function playFromStart(v: HTMLVideoElement, rate: number, onBlocked: (blocked: boolean) => void) {
  // iOS Safari's autoplay policy reads the muted *attribute*, which React never writes; stamp it
  // (and the inline-playback attributes) before asking, or the play() below is refused on iPhones.
  v.muted = true;
  v.defaultMuted = true;
  v.setAttribute('muted', '');
  v.setAttribute('webkit-playsinline', '');
  const apply = () => {
    v.playbackRate = rate;
    if (v.currentTime !== 0) v.currentTime = 0;
  };
  if (v.readyState >= 1) apply();
  else v.addEventListener('loadedmetadata', apply, { once: true });
  v.playbackRate = rate;
  v.play().then(
    () => onBlocked(false),
    // Refused. iOS Low Power Mode does this to muted inline video, and so does any browser whose
    // autoplay policy we have run out of credit with. Say so and give them something to press,
    // rather than leaving a still frame that looks broken.
    () => onBlocked(true)
  );
}

export function ServiceDemo({ area }: { area: ServiceArea }) {
  const set = demos[area.id];
  const [index, setIndex] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const tl = useRef<GSAPTimeline | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const firstRun = useRef(true);
  /** Set by the effect below; called straight from the tab's click handler. See `pick`. */
  const startRef = useRef<() => void>(() => {});

  const demo = set?.[index];
  const row = area.rows[index];


  // useLayoutEffect, not useEffect: `pick` drives this with flushSync and then calls startRef
  // immediately, so the new demonstration's start function has to exist by the time flushSync
  // returns. A passive effect would still be queued at that point.
  useLayoutEffect(() => {
    const el = stage.current;
    if (!el || !demo) return;

    const start = () => {
      if (demo.kind === 'video') {
        const v = video.current;
        if (!v) return;
        playFromStart(v, demo.rate, setBlocked);
      } else {
        tl.current?.play(0);
      }
    };

    const ctx = gsap.context(() => {
      if (demo.kind !== 'wipe') return;
      const t = gsap.timeline({ paused: true });
      t.fromTo('.demo__wipe', { '--cut': '0%' }, { '--cut': '100%', duration: 1.6, ease: 'power2.inOut' });
      tl.current = t;
    }, el);

    startRef.current = start;

    // Only the very first demonstration waits to be scrolled to. Every later one is started by
    // `pick`, from inside the click itself, so it is never started from here.
    if (!firstRun.current) {
      return () => {
        ctx.revert();
        tl.current = null;
      };
    }
    firstRun.current = false;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            start();
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
  }, [demo]);

  if (!set || !demo || !row) return null;

  /**
   * Choose a service and play it, without ever leaving the click.
   *
   * The obvious version — setIndex, let the effect notice and play — does not work: React returns
   * from the handler before the effect runs, so by the time `play()` is called the browser no
   * longer treats it as user-initiated. Muted inline video usually survives that, but not under
   * iOS Low Power Mode or anywhere autoplay is restricted, which is exactly why Replay (a direct
   * click handler) worked while picking a tab did not.
   *
   * flushSync renders and commits the new selection synchronously, so `startRef` already points at
   * the new demonstration and we are still inside the gesture when it plays.
   */
  const pick = (i: number) => {
    if (i !== index) flushSync(() => setIndex(i));
    startRef.current();
  };

  const replay = () => {
    if (demo.kind === 'video') {
      const v = video.current;
      if (!v) return;
      playFromStart(v, demo.rate, setBlocked);
    } else {
      tl.current?.play(0);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = area.rows.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = index === last ? 0 : index + 1;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = index === 0 ? last : index - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    pick(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="demo" aria-labelledby="demo-heading">
      <div className="demo__head reveal">
        <h2 id="demo-heading">Watch it</h2>
        <p>Pick a service to see what it does.</p>
      </div>

      <div className="demo__body">
        <div className="demo__tabs" role="tablist" aria-label={`${area.title} services`} onKeyDown={onKeyDown}>
          {area.rows.map((r, i) => (
            <button
              key={r.name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`demo-tab-${i}`}
              aria-selected={i === index}
              aria-controls="demo-panel"
              tabIndex={i === index ? 0 : -1}
              className="demo__tab"
              onClick={() => pick(i)}
            >
              <span className="demo__tabnum">{i + 1}</span>
              {r.name}
            </button>
          ))}
        </div>

        <div className="demo__panel" role="tabpanel" id="demo-panel" aria-labelledby={`demo-tab-${index}`}>
          <div className="demo__stage" ref={stage}>
            {demo.kind === 'wipe' ? (
              <figure className="demo__wipe" aria-label={demo.alt} role="img">
                <img
                  className="demo__plate"
                  src={`/photos/demo/${demo.id}-before-1400.jpg`}
                  srcSet={`/photos/demo/${demo.id}-before-800.jpg 800w, /photos/demo/${demo.id}-before-1400.jpg 1400w`}
                  sizes="(max-width: 899px) 100vw, 55vw"
                  alt=""
                  width="1400"
                  height="781"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  className="demo__plate demo__plate--after"
                  src={`/photos/demo/${demo.id}-after-1400.jpg`}
                  srcSet={`/photos/demo/${demo.id}-after-800.jpg 800w, /photos/demo/${demo.id}-after-1400.jpg 1400w`}
                  sizes="(max-width: 899px) 100vw, 55vw"
                  alt=""
                  width="1400"
                  height="781"
                  loading="lazy"
                  decoding="async"
                />
                <span className="demo__edge" aria-hidden="true" />
                <figcaption className="demo__badge demo__badge--before" aria-hidden="true">
                  Before
                </figcaption>
                <figcaption className="demo__badge demo__badge--after" aria-hidden="true">
                  After
                </figcaption>
              </figure>
            ) : (
              <div className="demo__video">
                <video
                  ref={video}
                  key={demo.src}
                  src={demo.src}
                  poster={demo.poster}
                  aria-label={demo.alt}
                  preload="none"
                  muted
                  playsInline
                  controls
                  width="1400"
                  height="788"
                />
                <p className="demo__trigger">{demo.trigger}</p>
                {blocked && (
                  <button type="button" className="demo__tap" onClick={replay}>
                    Tap to play
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="demo__foot">
            <p>{row.text}</p>
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
