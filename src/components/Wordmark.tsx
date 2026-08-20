import { company } from '../content/site';

/**
 * The client's logo exactly as it appears on their original site: the four-diamond mark with the
 * serif "Luxury / LANDSCAPING" wordmark. /logo-lockup.png is that artwork with the paper removed
 * and the black lettering turned white for the dark site; the mark's colours are untouched.
 * /logo-full.png is the same cut-out with black lettering, for light surfaces (print, documents).
 */
export function Wordmark() {
  return (
    <span className="wordmark">
      <img src="/logo-lockup.png" alt={company.name} width="358" height="144" />
    </span>
  );
}
