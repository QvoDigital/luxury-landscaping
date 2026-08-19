import { useEffect, useId, useRef, useState } from 'react';
import { allOff, allOn, categories, useConsent, writeConsent, type Choices } from '../lib/consent';
import { applyConsent } from '../lib/optional';

/**
 * Cookie consent: a first-visit notice with three equal choices, and a preferences dialog that
 * can be reopened from the footer at any time.
 *
 * - Notice: non-modal, bottom of the viewport, never blocks the page. Accept all and Reject
 *   non-essential are the same button style and size; Manage preferences opens the dialog.
 * - Dialog: role="dialog" aria-modal, focus moves in on open and returns to the opener on close,
 *   Tab is trapped inside, Escape closes. One toggle per category (strictly necessary is shown as
 *   always on and not switchable). Save stores the selection.
 * - Once a valid choice is stored it is not asked again for 12 months or until the policy
 *   version changes. See src/lib/consent.ts.
 */
export function CookieConsent() {
  const { record, ready, openRequested, clearOpenRequest } = useConsent();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState<Choices>(allOff);
  const opener = useRef<HTMLElement | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  const showNotice = ready && !record && !dialogOpen;

  // Apply the stored choice on load and every time it changes: loads anything newly allowed
  // from the optional-integrations registry and stamps <html data-consent="..."> with the result.
  useEffect(() => {
    if (ready) applyConsent(record);
  }, [ready, record]);

  useEffect(() => {
    if (!openRequested) return;
    clearOpenRequest();
    openDialog();
  });

  function openDialog() {
    opener.current = document.activeElement as HTMLElement | null;
    setDraft(record?.choices ?? allOff);
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    queueMicrotask(() => opener.current?.focus());
  }

  function choose(choices: Choices) {
    writeConsent(choices);
    if (dialogOpen) closeDialog();
  }

  // Focus management and keyboard handling for the dialog.
  useEffect(() => {
    if (!dialogOpen) return;
    const el = dialog.current;
    if (!el) return;
    const focusables = () =>
      Array.from(
        el.querySelectorAll<HTMLElement>('button, [href], input, [tabindex]:not([tabindex="-1"])')
      ).filter((n) => !n.hasAttribute('disabled'));
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDialog();
      } else if (e.key === 'Tab') {
        const list = focusables();
        if (list.length === 0) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen]);

  return (
    <>
      {showNotice && (
        <section className="consent" aria-label="Cookie notice">
          <p>
            This site uses one strictly necessary storage item to remember your cookie choice and
            no tracking cookies. Choose how non-essential cookies may be used if we ever add any.{' '}
            <a href="/cookies/">Cookie policy</a>
          </p>
          <div className="consent__actions">
            <button type="button" className="btn" onClick={() => choose(allOn)}>
              Accept all
            </button>
            <button type="button" className="btn" onClick={() => choose(allOff)}>
              Reject non-essential
            </button>
            <button type="button" className="btn btn--ghost" onClick={openDialog}>
              Manage preferences
            </button>
          </div>
        </section>
      )}

      {dialogOpen && (
        <div className="consent-backdrop" onClick={closeDialog}>
          <div
            ref={dialog}
            className="consent-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id={titleId}>Cookie preferences</h2>
            <p id={descId}>
              Choose which categories may be used. This site currently loads nothing in the
              optional categories; your choice is saved for 12 months and respected if that changes.
              Details in the <a href="/cookies/">cookie policy</a>.
            </p>

            <ul className="consent-dialog__list">
              <li>
                <div>
                  <strong>Strictly necessary</strong>
                  <p>Remembers your cookie choice and lets the site and quote form work. Always on.</p>
                </div>
                <span className="consent-dialog__always">Always on</span>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <div>
                    <strong id={`${titleId}-${c.id}`}>{c.label}</strong>
                    <p>{c.body}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={draft[c.id]}
                    aria-labelledby={`${titleId}-${c.id}`}
                    className="switch"
                    onClick={() => setDraft((d) => ({ ...d, [c.id]: !d[c.id] }))}
                  >
                    <span className="switch__knob" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="consent-dialog__actions">
              <button type="button" className="btn" onClick={() => choose(draft)}>
                Save preferences
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => choose(allOff)}>
                Reject non-essential
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => choose(allOn)}>
                Accept all
              </button>
              <button type="button" className="consent-dialog__close" onClick={closeDialog}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
