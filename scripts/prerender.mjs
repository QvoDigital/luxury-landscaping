/**
 * Post-build SEO pass.
 *
 * The app is a client-rendered Vite bundle, so the HTML that leaves the server is an empty
 * `<div id="root">`. This writes a readable version of each page into that element at build time,
 * generated from src/content/site.ts (the same module the app renders from), so crawlers that do
 * not execute JavaScript still see the business, the services, the FAQ and the contact details.
 * `createRoot` clears the container on mount, so React replaces it the moment it runs.
 *
 * Also emits FAQPage structured data from the same `faqs` array the page renders, so the markup
 * can never describe questions the visitor cannot see.
 *
 * Run: node scripts/prerender.mjs   (wired into `npm run build`)
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { legalDocs, legalMeta } from '../src/content/legal.ts';
import { company, contact, faqs, reviews, serviceGroups, team } from '../src/content/site.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distIndex = join(root, 'dist', 'index.html');
const distFaq = join(root, 'dist', 'faq', 'index.html');
const distTeam = join(root, 'dist', 'team', 'index.html');

const esc = (s) =>
  String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const address = `${contact.street}, ${contact.city}, ${contact.region} ${contact.postal}`;

function buildShell() {
  const groups = serviceGroups
    .map((g) => `<section><h3>${esc(g.title)}</h3><ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></section>`)
    .join('\n          ');
  const quotes = reviews
    .map((r) => `<blockquote><p>${esc(r.quote)}</p><footer>${esc(r.name)}, Google review</footer></blockquote>`)
    .join('\n          ');

  return `<div class="prerender shell">
        <h1>${esc(company.headline)}</h1>
        <p>${esc(company.sub)}</p>
        <h2>Services</h2>
          ${groups}
        <h2>What homeowners say</h2>
          ${quotes}
        <p><a href="/team/">Meet the team</a> | <a href="/faq/">Frequently asked questions</a></p>
        <h2>Contact</h2>
        <address>${esc(address)}<br /><a href="${esc(contact.phoneHref)}">${esc(contact.phone)}</a></address>
      </div>`;
}

function buildFaqShell() {
  const items = faqs.map((f) => `<section><h2>${esc(f.q)}</h2><p>${esc(f.a)}</p></section>`).join('\n        ');
  return `<div class="prerender shell">
        <p><a href="/">${esc(company.name)}</a></p>
        <h1>Questions</h1>
        ${items}
        <address>${esc(address)}<br /><a href="${esc(contact.phoneHref)}">${esc(contact.phone)}</a></address>
      </div>`;
}

function buildTeamShell() {
  const people = team.map((p) => `<section><h2>${esc(p.name)}</h2><p><strong>${esc(p.role)}</strong></p><p>${esc(p.body)}</p></section>`).join('\n        ');
  return `<div class="prerender shell">
        <p><a href="/">${esc(company.name)}</a></p>
        <h1>The people who show up</h1>
        ${people}
        <address>${esc(address)}<br /><a href="${esc(contact.phoneHref)}">${esc(contact.phone)}</a></address>
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

function buildFaqSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  // `</script>` inside a JSON payload would close the tag early.
  const json = JSON.stringify(schema, null, 2).replaceAll('</', '<\\/');
  return `<script type="application/ld+json">\n${json}\n    </script>`;
}

function buildLlmsTxt() {
  return `# ${company.name}

> ${company.tagline} Based at ${address}, Canada.

## Services

${serviceGroups.map((g) => `### ${g.title}\n${g.items.map((i) => `- ${i}`).join('\n')}`).join('\n\n')}

## Service area

Mississauga and the Greater Toronto Area.

## Team

${team.map((p) => `- ${p.name}: ${p.role}. ${p.body}`).join('\n')}

## Frequently asked questions

Full page: ${company.url}/faq/

${faqs.map((f) => `**${f.q}**\n${f.a}`).join('\n\n')}

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

async function inject(file, label, shell, { faqSchema = false } = {}) {
  const html = await readFile(file, 'utf8');
  if (!html.includes('<div id="root"></div>')) {
    console.error(`[prerender] Could not find an empty <div id="root"></div> in ${label}. Not writing.`);
    process.exit(1);
  }
  if (faqSchema && !html.includes('<!--FAQ_SCHEMA-->')) {
    console.error(`[prerender] Could not find the <!--FAQ_SCHEMA--> marker in ${label}. Not writing.`);
    process.exit(1);
  }
  let out = html.replace('<div id="root"></div>', `<div id="root">\n      ${shell}\n    </div>`);
  if (faqSchema) out = out.replace('<!--FAQ_SCHEMA-->', buildFaqSchema());
  await writeFile(file, out, 'utf8');
}

await inject(distIndex, 'dist/index.html', buildShell());
await inject(distFaq, 'dist/faq/index.html', buildFaqShell(), { faqSchema: true });
await inject(distTeam, 'dist/team/index.html', buildTeamShell());
for (const doc of legalDocs) {
  await inject(join(root, 'dist', doc.id, 'index.html'), `dist/${doc.id}/index.html`, buildLegalShell(doc));
}
await writeFile(join(root, 'dist', 'llms.txt'), buildLlmsTxt(), 'utf8');
console.log('[prerender] Injected static content into index, faq, team and legal pages, and wrote dist/llms.txt');
