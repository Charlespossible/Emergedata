/**
 * Real-browser verification pass.
 *
 *   npm run dev              # in one terminal
 *   node scripts/browser-check.mjs [baseUrl]
 *
 * For every route it checks:
 *   - no horizontal overflow at 320 / 360 / 768 / 1024 / 1440 / 2560
 *   - exactly one <h1>, and no skipped heading levels
 *   - axe-core: zero critical or serious violations
 *   - the skip link is the first focusable element and is visible when focused
 *   - no console errors and no failed network requests
 * and writes a screenshot per route to .screenshots/.
 */
import { mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import { AxePuppeteer } from '@axe-core/puppeteer';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const shots = path.join(root, '.screenshots');

/** Accepts a subfolder deploy too, e.g. http://localhost:4180/emerge */
const BASE = (process.argv[2] ?? 'http://localhost:4180').replace(/\/$/, '');
/**
 * Each route with the HTTP status it must return. /blog is deliberately absent from the
 * router while FEATURES.blog is false, so it has to answer 404 with the branded page —
 * not 200 with the home page, which would mislead crawlers and break hydration.
 */
const ROUTES = [
  { path: '/', status: 200 },
  { path: '/about', status: 200 },
  { path: '/focus-areas', status: 200 },
  { path: '/our-work', status: 200 },
  { path: '/leadership', status: 200 },
  { path: '/contact', status: 200 },
  { path: '/blog', status: 404 },
];
const WIDTHS = [320, 360, 768, 1024, 1440, 2560];

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
];

const failures = [];
const note = (route, message) => failures.push(`${route}: ${message}`);

function findChrome() {
  const found = CHROME_CANDIDATES.find((candidate) => candidate && existsSync(candidate));
  if (!found) throw new Error('No Chrome executable found. Set one in CHROME_CANDIDATES.');
  return found;
}

async function main() {
  mkdirSync(shots, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  for (const { path: route, status: expectedStatus } of ROUTES) {
    const page = await browser.newPage();
    const consoleErrors = [];
    const networkFailures = [];

    page.on('console', (message) => {
      if (message.type() !== 'error') return;
      // The browser logs a console error for the document's own non-200 status.
      if (expectedStatus !== 200 && message.text().includes('Failed to load resource')) return;
      consoleErrors.push(message.text());
    });
    // Minified React throws hydration failures rather than logging them, so a console
    // listener alone misses them entirely.
    page.on('pageerror', (error) => consoleErrors.push(`uncaught: ${error.message}`));
    page.on('requestfailed', (request) => {
      networkFailures.push(`${request.url()} (${request.failure()?.errorText})`);
    });
    page.on('response', (response) => {
      const isThisDocument = response.url() === `${BASE}${route}`;
      if (isThisDocument || response.status() < 400) return;
      networkFailures.push(`${response.url()} → ${response.status()}`);
    });

    await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
    const response = await page.goto(`${BASE}${route}`, {
      waitUntil: 'networkidle0',
      timeout: 30_000,
    });
    await new Promise((resolve) => setTimeout(resolve, 400));

    const actualStatus = response?.status();
    if (actualStatus !== expectedStatus) {
      note(route, `expected HTTP ${expectedStatus}, got ${actualStatus}`);
    }

    /* --- headings --- */
    const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', (nodes) =>
      nodes.map((node) => ({
        level: Number(node.tagName[1]),
        text: (node.textContent ?? '').trim().slice(0, 60),
      })),
    );
    const h1s = headings.filter((h) => h.level === 1);
    if (h1s.length !== 1) note(route, `expected 1 <h1>, found ${h1s.length}`);
    let previous = 0;
    for (const heading of headings) {
      if (previous && heading.level > previous + 1) {
        note(route, `heading level jumps h${previous} → h${heading.level} ("${heading.text}")`);
      }
      previous = heading.level;
    }

    /* --- skip link --- */
    const skip = await page.evaluate(() => {
      const first = document.querySelector('a[href="#main"]');
      if (!first) return { present: false };
      first.focus();
      const rect = first.getBoundingClientRect();
      return {
        present: true,
        focused: document.activeElement === first,
        visible: rect.width > 0 && rect.height > 0,
      };
    });
    if (!skip.present) note(route, 'no skip link');
    else if (!skip.visible) note(route, 'skip link is not visible when focused');

    /* --- horizontal overflow at every breakpoint --- */
    for (const width of WIDTHS) {
      await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
      await new Promise((resolve) => setTimeout(resolve, 250));
      const overflow = await page.evaluate((viewportWidth) => {
        const doc = document.documentElement;
        if (doc.scrollWidth <= viewportWidth + 1) return null;
        // Name the widest offending element so the failure is actionable.
        let worst = null;
        for (const node of document.querySelectorAll('body *')) {
          const rect = node.getBoundingClientRect();
          if (rect.right > viewportWidth + 1 && (!worst || rect.right > worst.right)) {
            worst = {
              right: Math.round(rect.right),
              tag: node.tagName.toLowerCase(),
              cls: (node.className?.toString?.() ?? '').slice(0, 90),
            };
          }
        }
        return { scrollWidth: doc.scrollWidth, worst };
      }, width);
      if (overflow) {
        note(
          route,
          `horizontal overflow at ${width}px (scrollWidth ${overflow.scrollWidth})` +
            (overflow.worst ? ` — <${overflow.worst.tag} class="${overflow.worst.cls}">` : ''),
        );
      }
    }

    /* --- axe --- */
    await page.setViewport({ width: 1440, height: 1000 });
    await new Promise((resolve) => setTimeout(resolve, 250));
    const results = await new AxePuppeteer(page)
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const serious = results.violations.filter((v) => ['critical', 'serious'].includes(v.impact));
    for (const violation of serious) {
      note(
        route,
        `axe ${violation.impact}: ${violation.id} — ${violation.help} (${violation.nodes.length}x) ` +
          `e.g. ${violation.nodes[0]?.target?.join(' ')}`,
      );
    }
    const minor = results.violations.filter((v) => !['critical', 'serious'].includes(v.impact));

    /* --- screenshot --- */
    const name = route === '/' ? 'home' : route.replace(/\//g, '');
    await page.screenshot({ path: path.join(shots, `${name}.png`), fullPage: true });

    for (const error of consoleErrors) note(route, `console error: ${error}`);
    for (const failure of networkFailures) note(route, `network: ${failure}`);

    console.log(
      `${route.padEnd(14)} ${actualStatus}  h1:${h1s.length}  axe serious:${serious.length} ` +
        `minor:${minor.length}  console:${consoleErrors.length}  net:${networkFailures.length}`,
    );
    await page.close();
  }

  await browser.close();

  console.log('\n' + '-'.repeat(70));
  if (failures.length === 0) {
    console.log('PASS — no issues found.');
  } else {
    console.log(`FAIL — ${failures.length} issue(s):`);
    for (const failure of failures) console.log('  • ' + failure);
    process.exitCode = 1;
  }
  console.log(`Screenshots: ${shots}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
