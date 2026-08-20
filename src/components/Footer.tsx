import { legalDocs } from '../content/legal';
import { company, contact, nav } from '../content/site';
import { openPreferences } from '../lib/consent';
import { Wordmark } from './Wordmark';

/**
 * Footer: business name and contact, and a Legal column with the four policy
 * pages plus the Cookie preferences control (a button, since it opens a dialog rather than
 * navigating). No social links: the business has not supplied any.
 */
/** Maple leaf, drawn inline so it needs no asset; the red is set in CSS. */
function MapleLeaf(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 512 512" width="18" height="18" fill="currentColor" {...props}>
      <path d="M256 16l40 96 48-24-16 72 72-24-24 56 72 16-56 48 40 56-88-8 8 64-72-32-12 104h-24l-12-104-72 32 8-64-88 8 40-56-56-48 72-16-24-56 72 24-16-72 48 24z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__row">
        <div className="footer__brand">
          <Wordmark />
          <p>{company.tagline}</p>
          <address>
            {contact.street}, {contact.city}, {contact.region} {contact.postal}
            <br />
            <a href={contact.phoneHref}>{contact.phone}</a>
            <br />
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </address>
          <p className="footer__canada">
            <MapleLeaf aria-hidden="true" />
            Proudly Canadian
          </p>
        </div>
        <nav aria-label="Pages" className="footer__col">
          <h2>Pages</h2>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Legal" className="footer__col">
          <h2>Legal</h2>
          <ul>
            {legalDocs.map((d) => (
              <li key={d.id}>
                <a href={d.path}>{d.navLabel}</a>
              </li>
            ))}
            <li>
              <button type="button" className="linklike" onClick={openPreferences}>
                Cookie preferences
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="shell footer__legal">
        <small>
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
