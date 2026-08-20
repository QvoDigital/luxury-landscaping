import { company } from '../content/site';

/**
 * Brand lockup: the client's diamond-mosaic logo mark (from their original Wix site, background
 * removed) beside the company name set in the site's display face. The full lockup with the
 * original black wordmark lives at /logo-full.png for use on light surfaces (print, OG images).
 */
export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="wordmark" data-light={light}>
      <img src="/logo-mark.png" alt="" width="52" height="60" aria-hidden="true" />
      <span>{company.name}</span>
    </span>
  );
}
