import { InstagramLogo } from '@phosphor-icons/react';
import { legalDocs } from '../content/legal';
import { company, contact, social } from '../content/site';
import { openPreferences } from '../lib/consent';
import { Wordmark } from './Wordmark';

/**
 * Footer: business name and contact, and a Legal column with the four policy
 * pages plus the Cookie preferences control (a button, since it opens a dialog rather than
 * navigating). Instagram is the business's only social profile.
 */
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
            <img src="/maple-leaf.png" alt="" width="36" height="34" aria-hidden="true" />
            Proudly Canadian
          </p>
          <a
            className="footer__social"
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Luxury Landscaping on Instagram"
          >
            <InstagramLogo size={28} weight="regular" aria-hidden="true" />
          </a>
        </div>
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
