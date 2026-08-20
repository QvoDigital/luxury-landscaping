import { ArrowRight } from '@phosphor-icons/react';
import { CookieConsent } from '../components/CookieConsent';
import { Footer } from '../components/Footer';
import { Masthead } from '../components/Masthead';
import { contact, cta, nav } from '../content/site';

/**
 * /404.html, served by the host for any path that does not exist (Netlify picks it up by name).
 * Same header and footer as every other page, one line of copy, and the places a lost visitor
 * most likely wanted. Old Wix URLs such as /copy-of-landscaping land here.
 */
export default function NotFoundPage() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main" tabIndex={-1} className="notfound section">
        <div className="shell">
          <div className="notfound__inner">
          <p className="notfound__code">404</p>
          <h1 className="display-l">That page isn&rsquo;t here.</h1>
          <p className="lede">The link may be old or mistyped. Everything on the site is one click away.</p>
          <ul className="notfound__links">
            <li>
              <a href="/">
                Home
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </a>
            </li>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href}>
                  {n.label}
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <div className="notfound__foot">
            <a className="btn" href={cta.href}>
              {cta.label}
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a className="menu__call" href={contact.phoneHref}>
              or call {contact.phone}
            </a>
          </div>
          </div>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
