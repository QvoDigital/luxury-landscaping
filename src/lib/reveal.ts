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

    // A hidden .wipe is clipped to zero visible area, and IntersectionObserver honours the
    // target's own clip-path — a fully clipped heading never intersects, so it would never be
    // revealed. Watch each wipe's parent (never clipped) and mark the wipe when it enters.
    const targetsFor = new Map<Element, HTMLElement[]>();
    for (const node of el.querySelectorAll<HTMLElement>('.reveal, .wipe, .rule')) {
      const watched = node.classList.contains('wipe') && node.parentElement ? node.parentElement : node;
      const list = targetsFor.get(watched) ?? [];
      list.push(node);
      targetsFor.set(watched, list);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            for (const t of targetsFor.get(entry.target) ?? []) t.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );

    for (const watched of targetsFor.keys()) io.observe(watched);
    return () => io.disconnect();
  }, [root]);
}
