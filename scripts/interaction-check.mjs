/**
 * Drives the real browser through every interactive flow on the site.
 *
 *   npm run serve                       # in one terminal
 *   node scripts/interaction-check.mjs  # or: npm run check:interaction
 *
 * Covers the mobile drawer (focus trap, scroll lock, Escape), the Our Work filters,
 * focus-area deep links, the contact form (validation, aria wiring, success state,
 * honeypot), the leader bio dialog, and the reduced-motion guard.
 */
import { existsSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

/** Accepts a subfolder deploy too, e.g. http://localhost:4180/emerge */
const BASE = (process.argv[2] ?? 'http://localhost:4180').replace(/\/$/, '');

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
];

const failures = [];
const pass = (message) => console.log(`  PASS ${message}`);
const fail = (message) => {
  failures.push(message);
  console.log(`  FAIL ${message}`);
};
const check = (condition, message, detail = '') =>
  condition ? pass(message) : fail(`${message}${detail ? ` — ${detail}` : ''}`);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function findChrome() {
  const found = CHROME_CANDIDATES.find((candidate) => candidate && existsSync(candidate));
  if (!found) throw new Error('No Chrome executable found. Set one in CHROME_CANDIDATES.');
  return found;
}

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

async function open(route, viewport = { width: 1440, height: 1000 }) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle0' });
  return page;
}

/* ---------------------------------------------------------------- drawer */
console.log('mobile drawer');
{
  const page = await open('/', { width: 390, height: 844 });
  await page.click('button[aria-expanded]');
  await wait(400);

  check(await page.$('[role="dialog"][aria-label="Site menu"]'), 'drawer opens');
  check(
    (await page.evaluate(() => getComputedStyle(document.body).overflow)) === 'hidden',
    'body scroll locked',
  );

  for (let i = 0; i < 25; i += 1) await page.keyboard.press('Tab');
  check(
    await page.evaluate(() =>
      document.querySelector('[role="dialog"]')?.contains(document.activeElement),
    ),
    'focus stays trapped in the drawer',
  );

  await page.keyboard.press('Escape');
  await wait(400);
  check(!(await page.$('[role="dialog"][aria-label="Site menu"]')), 'Escape closes the drawer');
  check(
    (await page.evaluate(() => getComputedStyle(document.body).overflow)) !== 'hidden',
    'body scroll restored',
  );

  await page.click('button[aria-expanded]');
  await wait(400);
  await page.evaluate(() =>
    [...document.querySelectorAll('[role="dialog"] a')]
      .find((link) => link.textContent.trim() === 'Leadership')
      ?.click(),
  );
  await wait(700);
  check(page.url().endsWith('/leadership'), 'a drawer link navigates', page.url());
  await page.close();
}

/* ----------------------------------------------------------------- filters */
console.log('our-work filters');
{
  const page = await open('/our-work');
  const count = () => page.$$eval('ul li article', (nodes) => nodes.length);
  const clickChip = (label) =>
    page.evaluate(
      (text) =>
        [...document.querySelectorAll('button[aria-pressed]')]
          .find((button) => button.textContent.trim() === text)
          ?.click(),
      label,
    );

  check((await count()) === 7, 'all 7 engagements shown');

  await clickChip('Health');
  await wait(400);
  check((await count()) === 2, 'Health filter shows 2');
  check(
    (await page.evaluate(() =>
      [...document.querySelectorAll('button[aria-pressed]')]
        .find((button) => button.textContent.trim() === 'Health')
        ?.getAttribute('aria-pressed'),
    )) === 'true',
    'aria-pressed set on the active chip',
  );

  await clickChip('Environment');
  await wait(400);
  check((await count()) === 3, 'Environment filter shows 3');
  await page.close();
}

/* --------------------------------------------------------------- deep link */
console.log('deep links');
{
  const page = await open('/focus-areas#markets');
  await wait(900);
  const position = await page.evaluate(() => {
    const target = document.getElementById('markets');
    return {
      top: Math.round(target.getBoundingClientRect().top),
      scrolled: Math.round(window.scrollY),
    };
  });
  check(position.scrolled > 200, '#markets deep link scrolls', `y=${position.scrolled}`);
  check(
    position.top >= 0 && position.top < 200,
    'the section clears the sticky header',
    `top=${position.top}`,
  );
  await page.close();
}

/* -------------------------------------------------------------------- form */
console.log('contact form');
{
  const page = await open('/contact', { width: 1440, height: 1200 });
  const submit = () =>
    page.evaluate(() =>
      [...document.querySelectorAll('button')]
        .find((button) => button.textContent.includes('Send message'))
        .click(),
    );

  await submit();
  await wait(700);
  const errors = await page.$$eval('p.text-accent-600', (nodes) => nodes.length);
  check(errors >= 2, 'validation blocks an empty submit', `${errors} errors`);

  const wiring = await page.evaluate(() => {
    const input = document.querySelector('input[name="name"]');
    const describedBy = input.getAttribute('aria-describedby');
    return {
      invalid: input.getAttribute('aria-invalid'),
      described:
        Boolean(describedBy) && Boolean(document.getElementById(describedBy.split(' ').pop())),
    };
  });
  check(
    wiring.invalid === 'true' && wiring.described,
    'errors wired via aria-invalid and aria-describedby',
    JSON.stringify(wiring),
  );

  await page.type('input[name="name"]', 'Ada Test');
  await page.type('input[name="email"]', 'ada@example.com');
  await page.select('select[name="interest"]', 'health');
  await page.type(
    'textarea[name="message"]',
    'We need a UHC readiness assessment for three states and want to discuss scope.',
  );
  await submit();
  await wait(1200);

  check(
    (await page.$$eval('p.text-accent-600', (nodes) => nodes.length)) === 0,
    'valid input passes validation',
  );
  const success = await page.evaluate(
    () => document.querySelector('[aria-live="polite"]')?.textContent.trim() ?? '',
  );
  check(success.length > 0, 'success announced in the aria-live region', success.slice(0, 45));

  const honeypot = await page.evaluate(() => {
    const field = document.querySelector('input[name="website"]');
    return {
      exists: Boolean(field),
      tabIndex: field?.getAttribute('tabindex'),
      hidden: field?.closest('[aria-hidden="true"]') !== null,
    };
  });
  check(
    honeypot.exists && honeypot.tabIndex === '-1' && honeypot.hidden,
    'honeypot present, hidden and untabbable',
    JSON.stringify(honeypot),
  );
  await page.close();
}

/* ------------------------------------------------------------------ dialog */
console.log('bio dialog');
{
  const page = await open('/leadership');
  await page.evaluate(() =>
    [...document.querySelectorAll('button')]
      .find((button) => button.textContent.includes('Read bio'))
      .click(),
  );
  await wait(500);

  const dialog = await page.evaluate(() => {
    const node = document.querySelector('[role="dialog"]');
    return node
      ? {
          modal: node.getAttribute('aria-modal'),
          labelled: Boolean(document.getElementById(node.getAttribute('aria-labelledby'))),
        }
      : null;
  });
  check(
    dialog && dialog.modal === 'true' && dialog.labelled,
    'bio dialog is modal and labelled',
    JSON.stringify(dialog),
  );

  await page.keyboard.press('Escape');
  await wait(400);
  check(!(await page.$('[role="dialog"]')), 'Escape closes the bio dialog');
  check(
    await page.evaluate(() => document.activeElement?.textContent?.includes('Read bio')),
    'focus returns to the trigger',
  );
  await page.close();
}

/* --------------------------------------------------------- reduced motion */
console.log('reduced motion');
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(`${BASE}/about`, { waitUntil: 'networkidle0' });
  await wait(600);
  const faded = await page.$$eval(
    '.reveal',
    (nodes) => nodes.filter((node) => getComputedStyle(node).opacity !== '1').length,
  );
  check(faded === 0, 'all content is visible with reduced motion', `${faded} still faded`);
  await page.close();
}

await browser.close();

console.log(`\n${'-'.repeat(60)}`);
if (failures.length) {
  console.log(`FAIL — ${failures.length} issue(s)`);
  process.exitCode = 1;
} else {
  console.log('PASS — all interaction checks passed');
}
