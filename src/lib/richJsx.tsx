import type { ReactNode } from 'react';

import { LINK } from './rich';

/** Turns "[text](href)" in a content string into anchors. Everything else is plain text. */
export function renderRich(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    out.push(
      <a key={i} href={m[2]}>
        {m[1]}
      </a>
    );
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
