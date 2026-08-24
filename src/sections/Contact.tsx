import { ArrowRight, CheckCircle, EnvelopeSimple, MapPin, Phone } from '@phosphor-icons/react';
import { useState, type FormEvent } from 'react';
import { serviceAreas } from '../content/services';
import { contact, programOptions } from '../content/site';

type Status = 'idle' | 'sending' | 'sent' | 'mailed';

/** A mailto: link to sales@ with the quote request already written out. */
function mailtoFor(f: Record<string, string>): string {
  const body = [
    `Name: ${f.name ?? ''}`,
    `Email: ${f.email ?? ''}`,
    `Phone: ${f.phone || '-'}`,
    `Service: ${f.service || 'Not sure yet'}`,
    '',
    f.message ?? '',
  ].join('\n');
  const subject = f._subject || 'Quote request from luxurylandscaping.ca';
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Quote request form. Submissions are emailed to contact.email (sales@luxurylandscaping.ca)
 * through FormSubmit (https://formsubmit.co), which needs no account, key or hosting setup, so
 * it works on any host. The first submission ever sends a one-time "Activate form" email to
 * that inbox; click it once and every later submission is delivered. Fields: name / email /
 * phone / service / message, honeypot `_honey`. Submission is a JSON fetch so the page never
 * reloads and the success / error state is shown inline.
 */
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${contact.email}`;
/**
 * `/?program=Deluxe#contact` (from the programs page) pre-selects that program in the Service
 * dropdown and starts the message. Anything that is not one of the four programs is ignored.
 */
function programFromUrl(): string {
  const raw = new URLSearchParams(window.location.search).get('program') ?? '';
  return ['Basic', 'Deluxe', 'Luxury', 'Consulting'].includes(raw) ? raw : '';
}
function programOption(program: string): string {
  return programOptions.find((o) => o.startsWith(program)) ?? '';
}

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const program = programFromUrl();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    const fields = Object.fromEntries(new FormData(form)) as Record<string, string>;
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data: { success?: string | boolean } = await res.json();
      if (String(data.success) !== 'true') throw new Error('rejected');
      form.reset();
      setStatus('sent');
    } catch {
      // Direct delivery unavailable: hand the message to the visitor's own email app, already
      // addressed to sales@ and filled in, so the request always reaches the inbox.
      window.location.href = mailtoFor(fields);
      form.reset();
      setStatus('mailed');
    }
  }

  return (
    <section id="contact" className="contact section" aria-labelledby="contact-heading">
      <div className="shell contact__grid">
        <div className="contact__intro">
          <h2 id="contact-heading" className="display-l wipe">
            Get a quote.
          </h2>
          <p className="lede reveal">Mississauga and the GTA. Here is how it works.</p>
          <ol className="contact__steps reveal" aria-label="How a quote works">
            <li>Send the form or call.</li>
            <li>We come out and walk the property with you.</li>
            <li>You get a written quote for the work discussed.</li>
          </ol>
          <address className="contact__facts reveal">
            <a href={contact.phoneHref}>
              <Phone size={20} aria-hidden="true" />
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`}>
              <EnvelopeSimple size={20} aria-hidden="true" />
              {contact.email}
            </a>
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin size={20} aria-hidden="true" />
              {contact.street}, {contact.city}
            </a>
          </address>
        </div>

        <form
          className="form reveal"
          name="quote"
          method="POST"
          action={FORM_ENDPOINT.replace('/ajax/', '/')}
          onSubmit={onSubmit}
          aria-describedby="form-status"
        >
          <input type="hidden" name="_subject" value="Quote request from luxurylandscaping.ca" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <p className="sr-only" aria-hidden="true">
            <label>
              Leave this field empty <input name="_honey" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <div className="form__row">
            <div className="form__field">
              <label htmlFor="f-name">Name <span className="form__req">(required)</span></label>
              <input id="f-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="form__field">
              <label htmlFor="f-phone">Phone <span className="form__req">(optional)</span></label>
              <input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" />
            </div>
          </div>

          <div className="form__row">
            <div className="form__field">
              <label htmlFor="f-email">Email <span className="form__req">(required)</span></label>
              <input id="f-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="form__field">
              <label htmlFor="f-service">Service <span className="form__req">(optional)</span></label>
              <select id="f-service" name="service" defaultValue={programOption(program)}>
                <option value="">Not sure yet</option>
                {serviceAreas.map((area) => (
                  <optgroup key={area.id} label={area.title}>
                    {area.rows.map((r) => (
                      <option key={r.name} value={`${area.title}: ${r.name}`}>
                        {r.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
                <optgroup label="Lawn care programs">
                  {programOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          <div className="form__field">
            <label htmlFor="f-message">What would you like done? <span className="form__req">(required)</span></label>
            <textarea
              id="f-message"
              name="message"
              rows={4}
              required
              defaultValue={program ? `I'm interested in the ${program} lawn care program.` : ''}
            />
          </div>

          <p className="form__privacy">
            We use what you send here only to respond to your request. See the{' '}
            <a href="/privacy/">privacy policy</a>.
          </p>

          <div className="form__foot">
            <button className="btn" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending' : 'Send'}
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </button>
            <p id="form-status" className="form__status" role="status" aria-live="polite" data-state={status}>
              {status === 'sent' && (
                <>
                  <CheckCircle size={20} weight="fill" aria-hidden="true" /> Sent. We will be in touch.
                </>
              )}
              {status === 'mailed' && (
                <>
                  <CheckCircle size={20} weight="fill" aria-hidden="true" /> Your email app has opened with the request
                  addressed to <a href={`mailto:${contact.email}`}>{contact.email}</a>. Press send there, or call{' '}
                  <a href={contact.phoneHref}>{contact.phone}</a>.
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
