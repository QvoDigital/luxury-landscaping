import { CaretDown, List, Phone, X } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { company, contact, cta, nav } from '../content/site';
import type { NavEntry } from '../content/site';
import { Wordmark } from './Wordmark';

/**
 * Sticky masthead. Wordmark, three nav items, phone and the quote button. "Services" is a group
 * rather than a link: on the desktop bar it opens a small panel holding the three service pages,
 * and below 900px the whole nav moves into the hamburger panel, where the group is a heading with
 * its pages listed under it. The phone stays visible at every width because it is the action a
 * homeowner on a phone actually wants. Links are root-relative, so the same header works on every
 * page.
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
              {nav.map((entry) =>
                'items' in entry ? (
                  <NavGroup key={entry.label} entry={entry} />
                ) : (
                  <li key={entry.href}>
                    <a href={entry.href}>{entry.label}</a>
                  </li>
                )
              )}
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
            {nav.map((entry) =>
              'items' in entry ? (
                <li key={entry.label} className="masthead__panelgroup">
                  <h2>{entry.label}</h2>
                  <ul>
                    {entry.items.map((i) => (
                      <li key={i.href}>
                        <a href={i.href}>{i.label}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={entry.href}>
                  <a href={entry.href}>{entry.label}</a>
                </li>
              )
            )}
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

/**
 * One nav item that holds pages instead of pointing at one. A button, not a link, because there is
 * no /services/ page behind it. Mouse opens it on hover, keyboard opens it with Enter or Space,
 * and it closes on Escape, on a click outside, or as soon as focus leaves the group.
 */
function NavGroup({ entry }: { entry: Extract<NavEntry, { items: readonly unknown[] }> }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLLIElement>(null);
  const menuId = `navgroup-${entry.label.toLowerCase()}`;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <li
      ref={root}
      className="navgroup"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        className="navgroup__btn"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        {entry.label}
        <CaretDown size={12} weight="bold" aria-hidden="true" />
      </button>
      <ul id={menuId} className="navgroup__menu" data-open={open}>
        {entry.items.map((i) => (
          <li key={i.href}>
            <a href={i.href} tabIndex={open ? undefined : -1}>
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}
