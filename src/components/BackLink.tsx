import { ArrowLeft } from '@phosphor-icons/react';

/**
 * "Back" for the sub-pages. Catalogue pages return to the Services / Programs section of the
 * home page (the two doors the visitor came through); Team returns to the home page. A plain link,
 * so it works in a new tab and without JavaScript; the home page jumps to the anchor on load.
 */
export function BackLink({ href = '/#services', label = 'Back' }: { href?: string; label?: string }) {
  return (
    <a href={href} className="back">
      <ArrowLeft size={16} weight="bold" aria-hidden="true" />
      {label}
    </a>
  );
}
