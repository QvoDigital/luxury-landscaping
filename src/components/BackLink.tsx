import { ArrowLeft } from '@phosphor-icons/react';

/**
 * "Back" for the catalogue pages. Always returns to the Services / Programs section of the home
 * page (the two doors the visitor came through), not the top of the site. A plain link, so it
 * works in a new tab and without JavaScript; the home page jumps to the anchor on load.
 */
export function BackLink({ label = 'Back' }: { label?: string }) {
  return (
    <a href="/#services" className="back">
      <ArrowLeft size={16} weight="bold" aria-hidden="true" />
      {label}
    </a>
  );
}
