/**
 * Extracts and optimises every image the site needs from the client's .docx profile.
 *
 *   node scripts/prepare-images.mjs
 *
 * Sources: ../Website_Emerge_Data_Company_Profile_2025.docx for everything embedded in the
 * profile, plus source-images/ for originals the client supplied separately.
 * A .docx is a zip; the embedded media sits in word/media/. The mapping below was
 * established by reading the document body and matching each image to the paragraph
 * that anchors it — do not renumber it without re-checking the document.
 *
 * Outputs (all committed, so a fresh clone needs no docx):
 *   public/images/team/*.webp + *.jpg    square headshots, 640px
 *   public/images/partners/*.png         partner marks, transparent, uniform height
 *   public/images/og/*                   OG card and 512px logo for JSON-LD
 *   public/favicon*.png                  favicon set
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';
import sharp from 'sharp';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const docx = path.resolve(root, '..', 'Website_Emerge_Data_Company_Profile_2025.docx');
const work = path.join(root, '.tmp-docx');
const media = path.join(work, 'word', 'media');
const pub = path.join(root, 'public');
const supplied = path.join(root, 'source-images');

/** image file in word/media → output slug in public/images/team */
const HEADSHOTS = {
  'image6.jpeg': 'kenneth-apeh',
  'image7.jpg': 'loveth-olanma-ubi',
  'image8.jpg': 'fortune-iriaye',
  'image9.jpeg': 'hope-nelson',
  'image10.png': 'arome-ibrahim',
  'image11.jpg': 'alberta-atigbi',
};

/**
 * Partner marks. `crop` is an optional pixel region taken before anything else, for
 * sources that carry more than the logo — the ArchiVisual scan includes decorative
 * bubbles, a blueprint fragment and a clipped registration line.
 */
const PARTNERS = {
  'image1.jpg': { slug: 'afdb' },
  'image2.jpeg': {
    slug: 'archivisual-solutions',
    crop: { left: 0, top: 0, width: 351, height: 110 },
  },
  'image3.png': { slug: 'enspire' },
  'image4.jpg': { slug: 'jci-abuja-unity' },
  'image5.png': { slug: 'nigeria-climate-innovation-centre' },
};

const LOGO = 'image13.jpeg';

/**
 * Minimal ZIP reader over the central directory. A .docx only ever uses stored (0) or
 * deflate (8), both of which node:zlib handles, so this avoids both a dependency and a
 * shell-out to a platform-specific unzip.
 */
function unzipDocx() {
  if (!existsSync(docx)) {
    throw new Error(`Source profile not found at ${docx}`);
  }
  rmSync(work, { recursive: true, force: true });

  const buf = readFileSync(docx);

  // End of central directory record: signature 0x06054b50, scanned from the tail.
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0 && i > buf.length - 66_000; i -= 1) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd === -1) throw new Error('Not a zip archive: no end-of-central-directory record.');

  const entryCount = buf.readUInt16LE(eocd + 10);
  let offset = buf.readUInt32LE(eocd + 16);

  for (let i = 0; i < entryCount; i += 1) {
    if (buf.readUInt32LE(offset) !== 0x02014b50) break;
    const method = buf.readUInt16LE(offset + 10);
    const compressedSize = buf.readUInt32LE(offset + 20);
    const nameLength = buf.readUInt16LE(offset + 28);
    const extraLength = buf.readUInt16LE(offset + 30);
    const commentLength = buf.readUInt16LE(offset + 32);
    const localOffset = buf.readUInt32LE(offset + 42);
    const name = buf.toString('utf8', offset + 46, offset + 46 + nameLength);
    offset += 46 + nameLength + extraLength + commentLength;

    // Only the embedded media is needed; skip the XML parts entirely.
    if (!name.startsWith('word/media/') || name.endsWith('/')) continue;

    const localNameLength = buf.readUInt16LE(localOffset + 26);
    const localExtraLength = buf.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const raw = buf.subarray(dataStart, dataStart + compressedSize);
    const contents = method === 0 ? raw : inflateRawSync(raw);

    const target = path.join(work, name);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, contents);
  }
}

const ensure = (dir) => mkdirSync(dir, { recursive: true });

/**
 * Headshots the client supplied separately, i.e. not embedded in the .docx profile.
 * Drop the original in `source-images/` under the filename on the left.
 *
 * `position` controls the square crop. The .docx headshots are studio portraits, so 'top'
 * frames them well. A photo taken at a podium or in a group is mostly background, so it
 * needs `sharp.strategy.attention`, which crops to the most salient region — in practice
 * the face. Set an explicit `crop` (pixels, applied first) when neither framing works.
 */
const SUPPLIED_HEADSHOTS = {
  // Podium photo, 1600x1189. Measured on the source: hair top y=430, chin y=690, face
  // centre x=950. This square puts the head at ~45% of the frame with headroom above,
  // matching the framing of the studio portraits from the profile. `attention` was tried
  // first and framed her far too loosely — most of the crop was curtain.
  'lydia-ezenwa': { crop: { left: 660, top: 355, width: 580, height: 580 } },
};

/** Extensions accepted for a supplied original, so the sender's choice does not matter. */
const SOURCE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG'];

/** Finds `source-images/<slug>.<ext>` whatever the extension, or null. */
function findSupplied(slug) {
  for (const extension of SOURCE_EXTENSIONS) {
    const candidate = path.join(supplied, `${slug}${extension}`);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

async function buildHeadshots() {
  const out = path.join(pub, 'images', 'team');
  ensure(out);

  for (const [file, slug] of Object.entries(HEADSHOTS)) {
    const src = path.join(media, file);
    if (!existsSync(src)) {
      console.warn(`  ! missing ${file} — skipping ${slug}`);
      continue;
    }
    await writeHeadshot(sharp(src).resize(640, 640, { fit: 'cover', position: 'top' }), out, slug);
  }

  for (const [slug, { position, crop }] of Object.entries(SUPPLIED_HEADSHOTS)) {
    const src = findSupplied(slug);
    if (!src) {
      console.warn(`  ! ${slug}: no source-images/${slug}.* yet — leaving the monogram fallback`);
      continue;
    }
    const pipeline = sharp(src);
    if (crop) pipeline.extract(crop);
    await writeHeadshot(
      pipeline.resize(640, 640, { fit: 'cover', position: position ?? 'top' }),
      out,
      slug,
    );
  }
}

/** Writes one square portrait as webp + jpg. */
async function writeHeadshot(pipeline, out, slug) {
  const base = pipeline.flatten({ background: '#F1F5F9' });
  await base
    .clone()
    .webp({ quality: 82 })
    .toFile(path.join(out, `${slug}.webp`));
  await base
    .clone()
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(out, `${slug}.jpg`));
  console.log(`  team/${slug}`);
}

/**
 * Partner marks are normalised to a common height so they share an optical size, but are
 * never enlarged past their native resolution — the source rasters range from 123px to
 * 862px tall, and upscaling the small ones just blurs their text. The row is displayed at
 * roughly 40-48px, so every mark is downscaled at render time and stays crisp.
 */
const LOGO_HEIGHT = 240;
const LOGO_MAX_WIDTH = 640;

/** At or above this luminance a pixel is fully background. */
const WHITE_CUTOFF = 232;

/**
 * Width of the soft edge below the cutoff, in luminance levels. Anything this far below
 * the cutoff is fully opaque; in between, alpha ramps.
 *
 * A hard binary threshold looks fine on a clean vector export but ragged on a small JPEG:
 * compression ringing around the mark lands either side of the cutoff, so edges break up
 * into speckle — very visible once the row knocks everything out to flat white. Ramping
 * the alpha keeps the anti-aliasing that was already in the source.
 */
const ALPHA_RAMP = 46;

/**
 * Returns a PNG buffer with the white background dropped to transparent, so a mark that
 * arrived as a JPEG behaves like one that arrived with an alpha channel.
 */
async function whiteToAlpha(src, crop) {
  const pipeline = sharp(src);
  if (crop) pipeline.extract(crop);

  const { data, info } = await pipeline.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    // Rec. 601 luma: a yellow logo element on white must stay opaque, so judge by
    // perceived lightness rather than by each channel independently.
    const luma = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    const opacity = (WHITE_CUTOFF - luma) / ALPHA_RAMP;
    data[i + 3] = Math.max(0, Math.min(1, opacity)) * 255;
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();
}

/**
 * Partner marks the client supplied separately, keyed by the file's basename in
 * `source-images/` (any extension) → the slug written into public/images/partners/.
 */
const SUPPLIED_PARTNERS = {
  'Dew-drop': { slug: 'dew-drop-foundation' },
  deal: { slug: 'deal' },
  chida: { slug: 'chida' },
};

async function buildPartners() {
  const out = path.join(pub, 'images', 'partners');
  ensure(out);
  const dimensions = [];

  const jobs = [
    ...Object.entries(PARTNERS).map(([file, entry]) => ({
      src: path.join(media, file),
      label: file,
      ...entry,
    })),
    ...Object.entries(SUPPLIED_PARTNERS).map(([file, entry]) => ({
      src: findSupplied(file),
      label: `source-images/${file}.*`,
      ...entry,
    })),
  ];

  for (const { src, label, slug, crop } of jobs) {
    if (!src || !existsSync(src)) {
      console.warn(`  ! missing ${label} — skipping ${slug}`);
      continue;
    }
    // Several source marks are JPEGs, so their "background" is opaque white. The site
    // renders this row knocked out to white on the deep brand band, which would turn a
    // white-backed logo into a solid block — so drop near-white pixels to transparent first.
    const transparent = await whiteToAlpha(src, crop);

    // Trim the now-transparent padding down to the mark itself, then scale to the shared
    // height. Letterboxed marks would otherwise render at wildly different optical sizes
    // behind a single CSS height.
    const mark = sharp(transparent).trim({ threshold: 1 }).resize({
      height: LOGO_HEIGHT,
      width: LOGO_MAX_WIDTH,
      fit: 'inside',
      withoutEnlargement: true,
    });

    // sharp's toFile resolves with the output info directly.
    const info = await mark
      .clone()
      .webp({ quality: 88, alphaQuality: 100 })
      .toFile(path.join(out, `${slug}.webp`));
    await mark
      .clone()
      .png({ compressionLevel: 9 })
      .toFile(path.join(out, `${slug}.png`));

    dimensions.push({ slug, width: info.width, height: info.height });
    console.log(`  partners/${slug}  ${info.width}x${info.height}`);
  }

  // The <img> width/height attributes in src/content/partners.ts must match these, or the
  // row shifts as the marks load. Copy them across whenever a logo is replaced.
  console.log('\n  width/height for src/content/partners.ts:');
  for (const d of dimensions) console.log(`    ${d.slug}: width ${d.width}, height ${d.height}`);
  console.log('');
}

async function buildBrandAssets() {
  const src = path.join(media, LOGO);
  const ogDir = path.join(pub, 'images', 'og');
  ensure(ogDir);

  if (existsSync(src)) {
    // Trim the wordmark crop down to the circular mark, then square it.
    await sharp(src)
      .resize(512, 512, { fit: 'contain', background: '#FFFFFF' })
      .png({ compressionLevel: 9, palette: true })
      .toFile(path.join(ogDir, 'logo-512.png'));

    for (const size of [32, 180]) {
      await sharp(src)
        .resize(size, size, { fit: 'contain', background: '#FFFFFF' })
        .png()
        .toFile(path.join(pub, size === 32 ? 'favicon-32.png' : 'apple-touch-icon.png'));
    }
    console.log('  og/logo-512, favicon-32, apple-touch-icon');
  }

  // 1200×630 Open Graph card, composed rather than photographed.
  const card = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0D2340"/>
      <stop offset="100%" stop-color="#122E52"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <g transform="translate(880 315)" fill="none" stroke-width="26" opacity="0.10">
    <path d="M-40 -170A180 180 0 0 1 155 -80" stroke="#FFFFFF"/>
    <path d="M-160 120A180 180 0 0 1 -160 -120" stroke="#DC2626" opacity="0.5"/>
    <path d="M155 80A180 180 0 0 1 -40 170" stroke="#5B85C4"/>
  </g>
  <text x="80" y="250" font-family="Georgia, serif" font-size="72" font-weight="700" fill="#FFFFFF">Emerge Data</text>
  <text x="80" y="320" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#B9CEEA">Data-Driven Intelligence for Africa&#8217;s Economy</text>
  <rect x="80" y="370" width="72" height="4" fill="#DC2626"/>
  <text x="80" y="452" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#8FADDA">Data intelligence and management consulting</text>
  <text x="80" y="492" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#8FADDA">Abuja, Nigeria</text>
  <text x="80" y="562" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#5B85C4">www.emergedata.com.ng</text>
</svg>`);
  await sharp(card)
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(ogDir, 'emerge-data-og.jpg'));
  console.log('  og/emerge-data-og.jpg');
}

/** Copies the two Latin variable faces to stable public/ paths so index.html can preload them. */
async function copyFonts() {
  const out = path.join(pub, 'fonts');
  ensure(out);
  const faces = {
    '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2': 'inter-latin-var.woff2',
    '@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2':
      'fraunces-latin-var.woff2',
  };
  for (const [from, to] of Object.entries(faces)) {
    const src = path.join(root, 'node_modules', from);
    if (!existsSync(src)) {
      console.warn(`  ! missing ${from}`);
      continue;
    }
    copyFileSync(src, path.join(out, to));
    console.log(`  fonts/${to}`);
  }
}

async function main() {
  console.log('Extracting media from the company profile…');
  unzipDocx();
  await buildHeadshots();
  await buildPartners();
  await buildBrandAssets();
  await copyFonts();
  rmSync(work, { recursive: true, force: true });
  console.log('Done.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
