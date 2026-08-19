/**
 * One-off photo optimiser. Converts any PNG in public/photos to a quality-82 JPEG at the same
 * dimensions, plus a 900px-wide variant for narrow viewports. Run after dropping in new photos:
 *
 *   node scripts/optimize-photos.mjs
 */
import { readdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const dir = new URL('../public/photos/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

for (const file of await readdir(dir)) {
  if (!/\.png$/i.test(file)) continue;
  const { name } = parse(file);
  const input = join(dir, file);
  const meta = await sharp(input).metadata();

  await sharp(input).jpeg({ quality: 82, mozjpeg: true }).toFile(join(dir, `${name}.jpg`));
  if ((meta.width ?? 0) > 900) {
    await sharp(input).resize({ width: 900 }).jpeg({ quality: 80, mozjpeg: true }).toFile(join(dir, `${name}-900.jpg`));
  }
  console.log(`optimised ${file} (${meta.width}x${meta.height})`);
}
