import { useEffect } from 'react';

/**
 * Marks `.reveal` elements inside `root` with `.is-in` the first time they enter the viewport.
 *
 * One IntersectionObserver for the whole page, created once, disconnected on unmount. Elements
 * that are already on screen at mount (the hero) get the class immediately so nothing pops in
 * after first paint. Sibling order sets a small stagger through `--reveal-delay`, capped so a long
 * list never makes the last item wait.
 */
export function useReveal(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    document.documentElement.classList.add('js');

    const items = Array.from(el.querySelectorAll<HTMLElement>('.reveal'));
    const groups = new Map<Element | null, number>();
    for (const item of items) {
      const parent = item.parentElement;
      const i = groups.get(parent) ?? 0;
      item.style.setProperty('--reveal-delay', `${Math.min(i, 7) * 60}ms`);
      groups.set(parent, i + 1);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );

    for (const item of items) io.observe(item);
    return () => io.disconnect();
  }, [root]);
}
