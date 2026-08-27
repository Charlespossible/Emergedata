/**
 * Serves dist/ the way the shipped .htaccess does, so local verification matches
 * production. `vite preview` does not: it hands unknown paths straight to index.html,
 * which silently served the home page for /about and masked a hydration mismatch.
 *
 *   node scripts/serve-dist.mjs [port] [basePath]
 *
 * basePath mirrors the BASE_PATH the site was built with, so a subfolder deploy can be
 * verified locally at http://localhost:4180/emerge/ exactly as it will be on the host.
 *
 * Resolution order, mirroring public/.htaccess:
 *   1. the exact file
 *   2. <path>.html
 *   3. <path>/index.html
 *   4. 404.html with a 404 status — every real route is pre-rendered, so anything that
 *      gets this far genuinely does not exist. Returning the home page with a 200 would
 *      both mislead crawlers and break hydration.
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(here, '..', 'dist');
const port = Number(process.argv[2] ?? 4180);

/** Deploy subfolder, normalised to a leading and trailing slash. */
const rawBase = process.argv[3] ?? '/';
const BASE = `/${rawBase.replace(/^\/+|\/+$/g, '')}/`.replace('//', '/');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

const isFile = (candidate) => existsSync(candidate) && statSync(candidate).isFile();

function resolve(urlPath) {
  let requested = decodeURIComponent(urlPath.split('?')[0]);

  // Strip the deploy folder, the way Apache resolves a request against the folder it
  // serves from. A request outside it would never have been routed here at all.
  if (BASE !== '/') {
    if (!requested.startsWith(BASE.slice(0, -1))) return null;
    requested = requested.slice(BASE.length - 1) || '/';
  }

  const clean = requested.replace(/\/+$/, '') || '/index.html';
  const target = path.join(dist, clean);

  // Never serve outside dist/.
  if (!target.startsWith(dist)) return null;

  if (isFile(target)) return { file: target, status: 200 };
  if (isFile(`${target}.html`)) return { file: `${target}.html`, status: 200 };
  if (isFile(path.join(target, 'index.html')))
    return { file: path.join(target, 'index.html'), status: 200 };
  return { file: path.join(dist, '404.html'), status: 404 };
}

/** Mirrors the AddOutputFilterByType DEFLATE list in public/.htaccess. */
const COMPRESSIBLE = /^(text\/|application\/(javascript|json|manifest\+json|xml)|image\/svg)/;

createServer((req, res) => {
  const resolved = resolve(req.url ?? '/');
  if (!resolved || !isFile(resolved.file)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  const { file, status } = resolved;
  const type = TYPES[path.extname(file)] ?? 'application/octet-stream';
  const headers = {
    'Content-Type': type,
    'Cache-Control': type.startsWith('text/html') ? 'no-cache' : 'public, max-age=31536000',
  };

  // Without this, measuring locally is misleading: the host compresses these responses,
  // so serving them raw inflates LCP by seconds under a throttled Lighthouse run.
  const acceptsGzip = /\bgzip\b/.test(req.headers['accept-encoding'] ?? '');
  if (acceptsGzip && COMPRESSIBLE.test(type)) {
    headers['Content-Encoding'] = 'gzip';
    headers.Vary = 'Accept-Encoding';
    res.writeHead(status, headers);
    createReadStream(file).pipe(createGzip()).pipe(res);
    return;
  }

  res.writeHead(status, headers);
  createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`Serving dist/ like Apache on http://localhost:${port}${BASE}`);
});
