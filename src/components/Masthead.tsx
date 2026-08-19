import { List, Phone, X } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { company, contact, cta, nav } from '../content/site';
import { Wordmark } from './Wordmark';

/**
 * Sticky masthead, 72px. Wordmark, one FAQ link, phone and the quote button. Below 900px the link
 * and the button move into a panel behind the hamburger; the phone stays visible because it is the
 * action a homeowner on a phone actually wants. Links are root-relative so the same header works
 * on the FAQ page.
 */
export function Masthead() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="masthead">
      <div className="shell masthead__row">
        <a href="/" className="masthead__brand" aria-label={`${company.name} home`}>
          <Wordmark />
        </a>

        <div className="masthead__actions">
          <nav className="masthead__nav" aria-label="Primary">
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="masthead__phone" href={contact.phoneHref}>
            <Phone size={18} weight="regular" aria-hidden="true" />
            <span>{contact.phone}</span>
          </a>
          <a className="btn masthead__cta" href={cta.href}>
            {cta.label}
          </a>
          <button
            type="button"
            className="icon-btn masthead__menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <List size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className="masthead__panel" data-open={open} onClick={() => setOpen(false)}>
        <nav aria-label="Primary, mobile">
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
            <li>
              <a href={contact.phoneHref}>{contact.phone}</a>
            </li>
          </ul>
          <a className="btn" href={cta.href}>
            {cta.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
