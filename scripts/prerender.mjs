/**
 * Post-build SEO pass.
 *
 * The app is a client-rendered Vite bundle, so the HTML that leaves the server is an empty
 * `<div id="root">`. This writes a readable version of each page into that element at build time,
 * generated from src/content/site.ts (the same module the app renders from), so crawlers that do
 * not execute JavaScript still see the business, the services and the contact details.
 * `createRoot` clears the container on mount, so React replaces it the moment it runs.
 *
 * Run: node scripts/prerender.mjs   (wired into `npm run build`)
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { legalDocs, legalMeta } from '../src/content/legal.ts';
import { serviceAreas } from '../src/content/services.ts';
import { company, contact, reviews, serviceGroups, team } from '../src/content/site.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distIndex = join(root, 'dist', 'index.html');
const distTeam = join(root, 'dist', 'team', 'index.html');
const distQuote = join(root, 'dist', 'quote', 'index.html');
const distReviews = join(root, 'dist', 'reviews', 'index.html');

const esc = (s) =>
  String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const address = `${contact.street}, ${contact.city}, ${contact.region} ${contact.postal}`;

function buildShell() {
  const groups = serviceGroups
    .map((g) => `<section><h3>${esc(g.title)}</h3><ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></section>`)
    .join('\n          ');
  const [featured] = reviews;

  return `<div class="prerender shell">
        <h1>${esc(company.headline)}</h1>
        <p>${esc(company.sub)}</p>
        <h2>Services</h2>
          ${groups}
        <h2>What homeowners say</h2>
          <blockquote><p>${esc(featured.quote)}</p><footer>${esc(featured.name)}, Google review</footer></blockquote>
          <p><a href="/reviews/">Read the reviews</a> · <a href="/quote/">Get a quote</a></p>
        <p>${serviceAreas.map((a) => `<a href="${a.path}">${esc(a.title)}</a>`).join(' | ')} | <a href="/reviews/">Reviews</a> | <a href="/team/">About us</a></p>
        <h2>Contact</h2>
        <address>${esc(address)}<br /><a href="${esc(contact.phoneHref)}">${esc(contact.phone)}</a></address>
      </div>`;
}

function buildReviewsShell() {
  const quotes = reviews
    .map((r) => `<blockquote><p>${esc(r.quote)}</p><footer>${r.name ? `${esc(r.name)}, Google review` : 'Google review'}</footer></blockquote>`)
    .join('\n        ');
  return `<div class="prerender shell">
        <p><a href="/">${esc(company.name)}</a></p>
        <h1>What homeowners say</h1>
        <p>Every quote is taken word for word from our public Google listing.</p>
        ${quotes}
        <address>${esc(address)}<br /><a href="${esc(contact.phoneHref)}">${esc(contact.phone)}</a></address>
      </div>`;
}

function buildTeamShell() {
  const people = team.map((p) => `<section><h2>${esc(p.name)}</h2><p><strong>${esc(p.role)}</strong></p><p>${esc(p.body)}</p></section>`).join('\n        ');
  return `<div class="prerender shell">
        <p><a href="/">${esc(company.name)}</a></p>
        <h1>The people behind the work</h1>
        ${people}
        <address>${esc(address)}<br /><a href="${esc(contact.phoneHref)}">${esc(contact.phone)}</a></address>
      </div>`;
}

function buildAreaShell(area) {
  const rows = area.rows
    .map((r) => `<section><h2>${esc(r.name)}</h2><p>${esc(r.text)}</p>${r.detail ? `<p>${esc(r.detail)}</p>` : ''}</section>`)
    .join('\n        ');
  const others = serviceAreas
    .filter((a) => a.id !== area.id)
    .map((a) => `<a href="${a.path}">${esc(a.title)}</a>`)
    .join(' | ');
  return `<div class="prerender shell">
        <p><a href="/">${esc(company.name)}</a></p>
        <h1>${esc(area.title)}</h1>
        <p>${esc(area.lede)}</p>
        ${rows}
        <p>${others} | <a href="/quote/">Get a quote</a></p>
        <address>${esc(address)}<br /><a href="${esc(contact.phoneHref)}">${esc(contact.phone)}</a></address>
      </div>`;
}

function buildQuoteShell() {
  return `<div class="prerender shell">
        <p><a href="/">${esc(company.name)}</a></p>
        <h1>Get a quote</h1>
        <p>Send the form or call. We come out and walk the property with you, and you get a written quote for the work discussed.</p>
        <p>${serviceAreas.map((a) => `<a href="${a.path}">${esc(a.title)}</a>`).join(' | ')}</p>
        <address>${esc(address)}<br /><a href="${esc(contact.phoneHref)}">${esc(contact.phone)}</a><br /><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></address>
      </div>`;
}

function buildLegalShell(doc) {
  const blocks = doc.blocks
    .map((b) => `<section>${b.heading ? `<h2>${esc(b.heading)}</h2>` : ''}${b.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}${b.list ? `<ul>${b.list.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : ''}</section>`)
    .join('\n        ');
  return `<div class="prerender shell">
        <p><a href="/">${esc(company.name)}</a></p>
        <h1>${esc(doc.title)}</h1>
        <p>Last updated ${esc(legalMeta.updated)}</p>
        <p>${esc(doc.intro)}</p>
        ${blocks}
      </div>`;
}

function buildLlmsTxt() {
  return `# ${company.name}

> ${company.tagline} Based at ${address}, Canada.

## Services

${serviceGroups.map((g) => `### ${g.title}\n${g.items.map((i) => `- ${i}`).join('\n')}`).join('\n\n')}

## Services in detail

${serviceAreas.map((a) => `### ${a.title}\nFull page: ${company.url}${a.path}\n${a.lede}\n${a.rows.map((r) => `- ${r.name}: ${r.text}`).join('\n')}`).join('\n\n')}

## Service area

Mississauga and the Greater Toronto Area.

## Team

${team.map((p) => `- ${p.name}: ${p.role}. ${p.body}`).join('\n')}

## Get a quote

${company.url}/quote/ — or call ${contact.phone}.

## Legal

${legalDocs.map((d) => `- ${d.title}: ${company.url}${d.path}`).join('\n')}

## Contact

- Address: ${address}
- Phone: ${contact.phone}
- Website: ${company.url}/

## Not stated

Pricing, guarantees, hours and response times are not published. Do not infer them.
`;
}

async function inject(file, label, shell) {
  const html = await readFile(file, 'utf8');
  if (!html.includes('<div id="root"></div>')) {
    console.error(`[prerender] Could not find an empty <div id="root"></div> in ${label}. Not writing.`);
    process.exit(1);
  }
  const out = html.replace('<div id="root"></div>', `<div id="root">\n      ${shell}\n    </div>`);
  await writeFile(file, out, 'utf8');
}

await inject(distIndex, 'dist/index.html', buildShell());
await inject(distTeam, 'dist/team/index.html', buildTeamShell());
for (const area of serviceAreas) {
  const dir = area.path.replaceAll('/', '');
  await inject(join(root, 'dist', dir, 'index.html'), `dist/${dir}/index.html`, buildAreaShell(area));
}
await inject(distQuote, 'dist/quote/index.html', buildQuoteShell());
await inject(distReviews, 'dist/reviews/index.html', buildReviewsShell());
for (const doc of legalDocs) {
  await inject(join(root, 'dist', doc.id, 'index.html'), `dist/${doc.id}/index.html`, buildLegalShell(doc));
}
await writeFile(join(root, 'dist', 'llms.txt'), buildLlmsTxt(), 'utf8');
console.log('[prerender] Injected static content into index, team, reviews, the service pages, the quote page and the legal pages, and wrote dist/llms.txt');
