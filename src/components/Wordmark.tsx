import { Leaf } from '@phosphor-icons/react';
import { company } from '../content/site';

/**
 * Typographic wordmark. The client has not supplied a logo file; when one arrives, replace the
 * contents of this component with an <img> and keep the same box so the masthead does not shift.
 */
export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="wordmark" data-light={light}>
      <Leaf size={22} weight="fill" aria-hidden="true" />
      <span>{company.name}</span>
    </span>
  );
}
