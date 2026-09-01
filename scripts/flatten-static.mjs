/**
 * Flatten pass for exact-file static hosts (Wix static hosting and similar).
 *
 * Such hosts serve only the files that exist: they do not resolve /team/ to
 * /team/index.html and have no rewrite rules. This step runs after prerender and
 *   1. copies every dist/<page>/index.html to a top-level dist/<page>.html, and
 *   2. rewrites every internal link from /<page>/ to /<page>.html across all
 *      emitted HTML, the JS bundles, and sitemap.xml (including the absolute
 *      canonical/OG URLs on the production domain).
 * The original <page>/index.html folders are kept, so hosts that DO support
 * clean URLs (Vercel, Netlify) still serve them.
 *
 * Run: node scripts/flatten-static.mjs   (wired into `npm run build`)
 */
import { copyFile, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

const entries = await readdir(dist, { withFileTypes: true });
const pages = [];
for (const e of entries) {
  if (!e.isDirectory() || e.name === 'assets') continue;
  try {
    await readFile(join(dist, e.name, 'index.html'));
    pages.push(e.name);
  } catch {
    /* directory without an index.html (photos, fonts) — not a page */
  }
}
if (pages.length === 0) throw new Error('flatten-static: no page folders found in dist');

for (const p of pages) {
  await copyFile(join(dist, p, 'index.html'), join(dist, `${p}.html`));
}

const names = pages.map((p) => p.replace(/[-]/g, '\\-')).join('|');
// "/team/" inside quotes (HTML attributes and JS string literals), optionally
// continuing with a query or fragment instead of the closing quote.
const quoted = new RegExp(`(["'\`])/(${names})/(\\1|[#?])`, 'g');
// https://www.luxurylandscaping.ca/team/ in canonicals, og:url, JSON-LD, sitemap.
const absolute = new RegExp(`(luxurylandscaping\\.ca)/(${names})/`, 'g');

const rewriteTargets = [join(dist, 'sitemap.xml')];
async function collect(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) await collect(full);
    else if (/\.(html|js|txt)$/.test(e.name)) rewriteTargets.push(full);
  }
}
await collect(dist);

let rewritten = 0;
for (const file of rewriteTargets) {
  let src;
  try {
    src = await readFile(file, 'utf8');
  } catch {
    continue;
  }
  const out = src
    .replace(quoted, (m, q, name, tail) => `${q}/${name}.html${tail === q ? q : tail}`)
    .replace(absolute, '$1/$2.html');
  if (out !== src) {
    await writeFile(file, out);
    rewritten += 1;
  }
}

console.log(
  `[flatten-static] Wrote ${pages.map((p) => `${p}.html`).join(', ')} and rewrote links in ${rewritten} files`,
);
