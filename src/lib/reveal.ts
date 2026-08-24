import { useEffect } from 'react';

/**
 * Drives the three scroll-entrance primitives inside `root` by adding `.is-in` the first time each
 * element enters the viewport: `.reveal` (fade and rise), `.wipe` (a heading swept in from the
 * left) and `.rule` (a hairline drawn from the left). The CSS in global.css owns what each one
 * looks like; this only decides when.
 *
 * One IntersectionObserver for the whole page, created once, disconnected on unmount. Elements
 * that are already on screen at mount (the hero) get the class immediately so nothing pops in
 * after first paint. Sibling order sets a small stagger through `--reveal-delay`, capped so a long
 * list never makes the last item wait; only `.reveal` staggers, because a rule or a heading has no
 * siblings to queue behind.
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

    for (const node of el.querySelectorAll<HTMLElement>('.reveal, .wipe, .rule')) io.observe(node);
    return () => io.disconnect();
  }, [root]);
}
