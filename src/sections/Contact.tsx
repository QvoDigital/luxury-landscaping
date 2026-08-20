import { ArrowRight, CheckCircle, EnvelopeSimple, MapPin, Phone, WarningCircle } from '@phosphor-icons/react';
import { useState, type FormEvent } from 'react';
import { serviceAreas } from '../content/services';
import { contact, programOptions } from '../content/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Quote request form, wired for Netlify Forms: form name `quote`, fields name / email / phone /
 * service / message, honeypot `bot-field`. A static copy of the form lives in index.html so the
 * Netlify build crawler registers it. Submission is a fetch to "/" so the page never reloads and
 * the success / error state is shown inline. Hosting elsewhere: point `action` at your endpoint.
 */
/**
 * `/?program=Deluxe#contact` (from the packages page) pre-selects that program in the Service
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
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="contact section" aria-labelledby="contact-heading">
      <div className="shell contact__grid">
        <div className="contact__intro">
          <h2 id="contact-heading" className="display-l reveal">
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
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={onSubmit}
          aria-describedby="form-status"
        >
          <input type="hidden" name="form-name" value="quote" />
          <input type="hidden" name="subject" value="Quote request from luxurylandscaping.ca" />
          <p className="sr-only" aria-hidden="true">
            <label>
              Leave this field empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
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
              {status === 'error' && (
                <>
                  <WarningCircle size={20} weight="fill" aria-hidden="true" /> That did not go through. Please call{' '}
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
