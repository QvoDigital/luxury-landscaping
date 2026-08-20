import { useEffect } from 'react';

/**
 * Client-rendered pages mount after the browser has already tried to jump to `#hash`, so deep
 * links like /services/#winter or /?program=Deluxe#contact land at the top. On mount, jump to
 * the target instantly (a cross-page arrival, not an animation), and once more after `load`,
 * because the home page's ScrollTrigger refreshes when the hero images finish loading and
 * restores the scroll position it last measured.
 */
export function useHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    const jump = () => {
      const target = document.getElementById(id);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'instant' });
    };

    jump();
    if (document.readyState === 'complete') return;
    const onLoad = () => requestAnimationFrame(jump);
    window.addEventListener('load', onLoad, { once: true });
    return () => window.removeEventListener('load', onLoad);
  }, []);
}
