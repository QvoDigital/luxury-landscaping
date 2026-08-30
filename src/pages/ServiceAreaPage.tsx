import { ArrowRight, CaretDown } from '@phosphor-icons/react';
import { useEffect, useRef } from 'react';
import { BackLink } from '../components/BackLink';
import { CookieConsent } from '../components/CookieConsent';
import { Footer } from '../components/Footer';
import { LawnJourney } from '../components/LawnJourney';
import { Masthead } from '../components/Masthead';
import { ServiceDemo } from '../components/ServiceDemo';
import type { ServiceArea } from '../content/services';
import { serviceAreas } from '../content/services';
import { contact, cta } from '../content/site';
import { useReveal } from '../lib/reveal';

/**
 * One page per service area (2026-08-24, replacing the single /services/ list). Title, one line,
 * and rows of "name: one sentence" — the whole page reads in well under a minute. The foot
 * carries the other two areas, so a visitor who opened the wrong one is one click from the right
 * one without going back to the home page.
 *
 * Between the two sits the demonstration: one animation per row of the list above, chosen by the
 * visitor. It repeats what the words already said, so nothing is lost if it never runs.
 */

/**
 * Only Data Saver downgrades the banner to its poster — the visitor asked not to spend megabytes.
 * The client's explicit call (2026-08-30) is that these loops play on phones, so prefers-reduced-
 * motion no longer swaps them out; they are slow ambient clips behind a scrim, not UI motion.
 */
function stillBanner(): boolean {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(conn?.saveData);
}

/** Phones get the 640px encode (~1 MB instead of ~3.5 MB) so the loop starts fast on cellular. */
function bannerSrc(video: string): string {
  return window.matchMedia('(max-width: 699px)').matches ? video.replace('.mp4', '-640.mp4') : video;
}

/**
 * The banner clip, made to actually autoplay on phones.
 *
 * Two iOS traps live here. React sets `muted` as a DOM property and never writes the attribute,
 * but Safari's autoplay policy inspects the attribute — so a video that plays everywhere else
 * sits frozen on an iPhone. And Low Power Mode rejects even a legally muted autoplay; the promise
 * rejection is silent. So: stamp the attributes explicitly before asking, ask again once metadata
 * arrives, and if Safari said no, ask once more on the first touch or scroll — the loop is
 * decorative, so when it is refused for good the poster simply stands.
 */
function BannerLoop({ banner }: { banner: { video: string; poster: string } }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    v.setAttribute('webkit-playsinline', '');
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener('loadedmetadata', tryPlay, { once: true });
    const opts = { once: true, passive: true } as const;
    window.addEventListener('touchstart', tryPlay, opts);
    window.addEventListener('scroll', tryPlay, opts);
    const onVisible = () => !document.hidden && v.paused && tryPlay();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      v.removeEventListener('loadedmetadata', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
      window.removeEventListener('scroll', tryPlay);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={bannerSrc(banner.video)}
      poster={banner.poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disableRemotePlayback
      width="1280"
      height="720"
    />
  );
}
export default function ServiceAreaPage({ area }: { area: ServiceArea }) {
  const main = useRef<HTMLElement>(null);
  useReveal(main);

  const others = serviceAreas.filter((a) => a.id !== area.id);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main" ref={main} tabIndex={-1} className="menu section">
        <div className="shell">
          {/* With a banner, the header is one full-bleed animated rectangle: the opening words
              sit on the work happening, and the rectangle ends where the service rows begin.
              Reduced motion and Data Saver get the still poster frame instead of the loop. */}
          <header className={area.banner ? 'menu__head menu__head--wall' : 'menu__head'}>
            {area.banner && (
              <div className="menu__wall" aria-hidden="true">
                {stillBanner() ? (
                  <img src={area.banner.poster} alt="" width="1280" height="720" fetchPriority="high" decoding="async" />
                ) : (
                  <BannerLoop banner={area.banner} />
                )}
              </div>
            )}
            <BackLink />
            <h1 className="display-l wipe">{area.title}.</h1>
            <p className="lede reveal">{area.lede}</p>
          </header>

          <ul className="menu__rows menu__body rule">
            {area.rows.map((r) =>
              r.detail ? (
                // Rows with a longer story open on press. <details>, not state: it works without
                // JavaScript and the prerendered shell prints the full text either way.
                <li key={r.name} className="reveal">
                  <details className="menu__disclose">
                    <summary>
                      <span className="menu__disclose-head">
                        <h2>{r.name}</h2>
                        <CaretDown className="menu__caret" size={18} weight="bold" aria-hidden="true" />
                      </span>
                      <p>{r.text}</p>
                    </summary>
                    <p className="menu__detail">{r.detail}</p>
                  </details>
                </li>
              ) : (
                <li key={r.name} className="reveal">
                  <h2>{r.name}</h2>
                  <p>{r.text}</p>
                </li>
              )
            )}
          </ul>

          {area.id === 'lawn-care' ? <LawnJourney area={area} /> : <ServiceDemo area={area} />}

          <div className="menu__foot rule">
            <nav className="menu__more reveal" aria-label="Other services">
              <h2>The rest of what we do</h2>
              <ul>
                {others.map((o) => (
                  <li key={o.id}>
                    <a href={o.path}>
                      {o.title}
                      <ArrowRight size={16} weight="bold" aria-hidden="true" />
                    </a>
                    <span>{o.door}</span>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="menu__actions reveal">
              <a className="btn" href={cta.href}>
                {cta.label}
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </a>
              <a className="menu__call" href={contact.phoneHref}>
                or call {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
