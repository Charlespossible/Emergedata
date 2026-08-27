# Emerge Data — website

A static site for Emerge Data, a data intelligence and management consulting firm in Abuja,
Nigeria. No database, no backend, no CMS. All copy lives in typed content files, and every
route is pre-rendered to real HTML at build time.

**Stack:** Vite 5 · React 18 · TypeScript (strict) · Tailwind 3.4 · React Router 6

**Measured on the production build:** Lighthouse mobile 98–99 performance, 100 accessibility,
100 best practices, 100 SEO on every route. CLS 0, TBT 10–40 ms.

---

## Running it

```bash
npm install

npm run dev                # http://localhost:5173
npm run build              # → dist/  (client + SSR bundle + pre-render)
npm run serve              # serve dist/ the way the host will (port 4180)
npm run preview            # build, then serve

npm test                   # route, pre-render and hydration tests (vitest)
npm run lint
npm run check:browser      # axe, overflow, headings, HTTP status, console — real Chrome
npm run check:interaction  # drawer, filters, deep links, form, dialog, reduced motion
npm run verify             # lint + test + build + both browser checks

npm run images             # re-extract imagery from the .docx profile
```

The two `check:*` scripts need `npm run serve` running in another terminal, and a locally
installed Chrome (they use `puppeteer-core`, so nothing is downloaded).

---

## Where the copy lives

**Nothing in `src/pages/` or `src/components/` contains literal copy.** To change words on
the site, edit one file in `src/content/`:

| File | What it holds |
|---|---|
| `about.ts` | Who we are, mission, vision, presence, team scale, legal status, closing statement |
| `focusAreas.ts` | The six areas — title, summary, intro, capability list, "who we work with" |
| `differentiators.ts` | The four interlocking capabilities |
| `approach.ts` | The four-stage intelligence cycle and the benchmarking paragraph |
| `leadership.ts` | The seven leaders — role, teaser, bio, email, phone, photo path |
| `work.ts` | The seven select engagements |
| `partners.ts` | The client & partner community, and the partner logo list |
| `offices.ts` | Office addresses, each with a `published` flag |
| `countries.ts` | The nine countries of project experience |
| `stats.ts` | The proof-point numbers |
| `values.ts` | Core values |
| `pages.ts` | Section headings, eyebrows, CTA labels and per-page SEO strings |

Components never import from `src/content/` directly — they go through
**`src/lib/content.ts`**. That indirection is the upgrade path: when a CMS or API replaces
the static files, only that one file changes and every getter becomes `async`.

### Adding a route

Add it to `ROUTE_PATHS` in `src/routes.shared.tsx` and to the page map in **both**
`src/routes.tsx` (lazy, client) and `src/routes.server.tsx` (eager, pre-render). The
pre-render reads `ROUTE_PATHS` directly, so it picks the new route up automatically, and
`sitemap.xml` is generated from the same list at build time. Nothing else to update.

### Adding a focus area

1. Append an entry to `focusAreas.ts` with a unique `slug`, the next `number`, and a
   `color` from `'brand' | 'green' | 'amber' | 'teal' | 'violet' | 'accent'`.
2. Add the matching anchor link to `src/config/nav.ts` (both `NAV` children and `FOOTER_NAV`).

The Home grid, the Focus Areas page, the sticky rail and the contact form's "Area of
interest" dropdown all read from the same array — nothing else needs touching.

### Adding a leader

Append to `leaders` in `leadership.ts` with a unique `slug` and an `order`, and set
`photo: '/images/team/slug'`.

For the photo itself, drop the client's original into `source-images/` and register it in
`SUPPLIED_HEADSHOTS` in `scripts/prepare-images.mjs`, then run `npm run images`. That crops
it square, scales it to 640px and writes the `webp` + `jpg` pair. Photos embedded in the
.docx profile are handled automatically and need no entry there.

A leader with no `photo`, or whose image file is missing, falls back to the brand mark and
their initials — never a stock office photo, and never a broken image.

### Adding an engagement

Append to `engagements` in `work.ts`. The filter chips on `/our-work` are derived from the
data, so a new `group` appears automatically. Set `featured: true` to surface it on Home.

---

## Feature flags

All in `src/config/features.ts`. Flip one boolean; nothing else changes.

| Flag | Default | Effect |
|---|---|---|
| `blog` | `false` | Blog shows in the nav as a non-interactive "Soon" item and `/blog` is **not registered**, so it returns the branded 404. Setting it `true` makes the nav item a real link and registers the route. |
| `values` | `true` | The Core Values section on `/about`. |
| `legalStatus` | `true` | The CAC registration card on `/about`. |
| `partnerLogos` | `true` | The logo row on Home. Set `false` for the text-only partner treatment. |
| `map` | `false` | Reserved for an interactive presence map. Phase 1 ships a static country list. |
| `newsletter` | `false` | Reserved for footer newsletter capture. |

### Publishing an office

`src/content/offices.ts` seeds five offices. Only the Abuja HQ has `published: true` — the
other four addresses are carried over from the 2024 profile and are **unverified**. Once
the client confirms an address, set `published: true` and it appears on `/about` and
`/contact`. A test fails if an unpublished address ever renders.

---

## The contact form

There is no backend. `src/lib/contact.ts` is the only place delivery is decided:

- **With an endpoint** — set `VITE_CONTACT_ENDPOINT` in `.env` to a Formspree or Web3Forms
  URL and submissions POST there as JSON.
- **Without one** — the form composes the message in the visitor's own mail client and
  shows an "Opens your email app" note.

Both paths run the same validation (`react-hook-form` + `zod`), the same visually hidden
honeypot, and the same `aria-live` success/failure states. Phase 5 replaces the body of
`submitContact()` with a real API call; nothing else in the app knows how a message is
delivered.

```bash
# .env
VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
```

---

## Imagery

`npm run images` regenerates every image from
`../Website_Emerge_Data_Company_Profile_2025.docx` (a .docx is a zip; the script reads its
central directory directly, so it needs no unzip binary). It produces square headshots as
`webp` + `jpg`, partner marks, the favicon set, the 1200×630 OG card, and copies the two
Latin variable font files into `public/fonts/`. Outputs are committed, so a fresh clone
builds without the .docx present.

Partner marks get extra treatment: several arrive as JPEGs with an opaque white background,
so near-white pixels are made transparent, the padding is trimmed away, and each mark is
scaled to a common height **without ever being enlarged past its native resolution**. The
row renders them knocked out to white on the deep brand band, and deliberately small —
the source rasters are as little as 77px tall, and displaying them larger visibly softens
the type. **Larger logos need higher-resolution originals from the client.**

The script prints the output dimensions; copy them into the `width`/`height` fields in
`src/content/partners.ts` whenever a logo changes, or the row shifts as the marks load.

The logo in `src/components/ui/Logo.tsx` is redrawn as vector from the raster mark in the
profile. **Replace it when the client supplies the official SVG** — every use of the mark
points at that one component.

---

## Pre-rendering

`npm run build` does three things: builds the client bundle, builds an SSR bundle from
`src/entry-server.tsx`, then runs `scripts/prerender.mjs` to render every route in
`ROUTE_PATHS` to static HTML.

This is why the site scores what it does. Without it the first paint waits for React to
boot (LCP was 2.2s of pure JS render delay); with it the HTML arrives painted, and React
hydrates it. It also means crawlers get real markup with the correct per-route `<title>`,
description, canonical and JSON-LD.

Each route is written twice — `about.html` and `about/index.html` — so it resolves whether
the host uses the `.htaccess` rewrite or Apache's `DirectoryIndex`.

Two things to know when editing:

- **The `<Suspense>` boundary lives in `routes.shared.tsx`**, not in the client route
  table. `renderToString` emits boundary markers that the client expects to find; if only
  one side has the boundary, hydration fails and React throws the pre-rendered DOM away.
  `src/test/hydration.test.tsx` catches this.
- **`renderToString` does not resolve `React.lazy`** — it would emit the loading fallback
  instead of the page. That is why the server has its own eager route table.

---

## Deployment

### Where does it live — domain root, or a subfolder?

**This is the single thing to get right before uploading.** The built HTML references
assets by absolute path (`/assets/...`, `/images/...`). If you upload into a subfolder of
`public_html` but build for the root, the browser looks for those files at the domain root,
gets 404s, and the page renders blank or unstyled.

**At the domain root** — contents of `dist/` go directly into `public_html`:

```bash
npm run build
```

**In a subfolder** — e.g. reachable at `https://emergedata.com.ng/emerge/`:

```bash
BASE_PATH=/emerge/ npm run build
```

The leading and trailing slashes both matter. `BASE_PATH` flows through to everything that
needs it: asset URLs, the React Router basename, image paths built from `src/content/`,
`.htaccess` (`RewriteBase`, the `.html` rewrite, `ErrorDocument`), `site.webmanifest`,
`sitemap.xml`, `robots.txt`, and every canonical and `og:image` URL.

> **On Windows in Git Bash**, prefix the command with `MSYS_NO_PATHCONV=1`, or the shell
> rewrites `/emerge/` into a Windows path and bakes the wrong base into the build:
> `MSYS_NO_PATHCONV=1 BASE_PATH=/emerge/ npm run build`. PowerShell and cmd are unaffected.

Verify a subfolder build locally before uploading — this serves it exactly as the host will:

```bash
node scripts/serve-dist.mjs 4180 /emerge/
node scripts/browser-check.mjs http://localhost:4180/emerge
node scripts/interaction-check.mjs http://localhost:4180/emerge
```

### Public URL

Canonicals, `og:image` and the sitemap default to `https://www.emergedata.com.ng`. Building
for any other host — staging, a preview domain — set the origin too:

```bash
VITE_SITE_URL=https://staging.example.com BASE_PATH=/emerge/ npm run build
```

### cPanel / Apache

Upload the **contents** of `dist/` (not the `dist` folder itself) into the target directory.
`.htaccess` is generated into `dist/` by the build and already carries the right base — make
sure your FTP client is showing dotfiles so it actually gets uploaded. Force HTTPS and pick
one canonical host.

**There is no SPA shell fallback.** Every route the app has is pre-rendered, so a path that
does not resolve genuinely is a 404 and `ErrorDocument` serves the branded page with the
right status. Returning the home page with a 200 for unknown URLs would both mislead
crawlers and break hydration.

`npm run serve` reproduces these rules — including gzip — so local numbers match the host.
`vite preview` does not: it hands unknown paths straight to `index.html`, which silently
served the home page for `/about` and masked a hydration mismatch during development.

### Netlify / Vercel

Do not add a catch-all rewrite to `/index.html`. Point unknown paths at `/404.html` with a
404 status instead.

---

## Conventions worth keeping

- **Colour law.** Deep blue is structural; red is an accent capped at roughly 5% of any
  viewport — the eyebrow rule, the active nav underline, one CTA per page. Never a
  background fill, never body text. The six focus-area colours only ever appear as a
  numeral badge, a dot, a rule or a decorative icon; `focusColor.ts` writes every class out
  in full because Tailwind cannot see class names built by string concatenation.
- **`cn()` knows the custom font sizes.** `src/lib/cn.ts` extends `tailwind-merge` with the
  `text-display`/`text-h1`/`text-body`… scale. Without that, `tailwind-merge` reads
  `text-body` as a *colour* and silently drops the real one. Any new key in
  `theme.extend.fontSize` must be added there too.
- **Motion.** Three motions exist: fade-up on entry, 150ms hover, drawer slide. Every one is
  gated by `useReducedMotionSafe`, and `useInView` shares a single IntersectionObserver
  across all ~40 revealing elements on Home.
- **Size limits.** A page file stays under ~120 lines and holds only `<SEO />` plus section
  components. A section component stays under ~180 lines. Past that, split it.
- **Reuse.** Every repeated visual lives exactly once in `src/components/ui/`. No component
  ever imports from a page.

---

## Outstanding client input

Marked in the code with `TODO — CLIENT INPUT REQUIRED` or `[CARRIED — confirm]`:

1. **Engagement descriptions** (`work.ts`) — 25–40 words, plus confirmed partner and
   geography for each of the seven engagements. Only titles came from the 2025 profile.
2. **Differentiator descriptions** (`differentiators.ts`) — the four titles are verbatim;
   the supporting lines are drafted and need approval.
3. **Office addresses** (`offices.ts`) — unresolved, and the sources conflict. The live
   About page says in prose “Plateau, Anambra, Kano, and Lagos” but lists “Abuja, Kano,
   Borno, Niger, Lagos” on the same page; only Abuja, Kano and Lagos appear in both, and
   only Abuja has a published street address anywhere. **Which five states, and what are
   the current addresses?** All non-HQ entries stay unpublished until answered.
4. **Lydia Ezenwa's bio** (`leadership.ts`) — restructured from CV register into full
   sentences with no facts changed; needs sign-off.
5. **Missing contacts** — email addresses for Lydia Ezenwa and Hope Nelson, plus office
   hours. Note the live site publishes `research@emergedata.com.ng` while the 2025 profile
   uses `info@emergedata.com.ng`; the site follows the 2025 profile. Confirm which inbox is
   correct.
6. **Partner logos** (`partners.ts`) — the five marks come from the client's own profile
   document. Confirm they may be displayed publicly, and supply higher-resolution
   originals. No logo is attached to any name in the written "Clients & Partners" list.
7. **Assets** — the official SVG logo, higher-resolution partner marks, and higher-resolution
   headshots. Lydia Ezenwa’s photograph has been supplied: save it as
   `source-images/lydia-ezenwa.jpg` and run `npm run images`.
8. **Core values and legal status** — absent from the 2025 profile, but both are published on
   the client’s own live site (emergedata.com.ng/about), so the site now follows that
   wording. Confirm they carry over to the 2025 positioning, or flip `FEATURES.values` /
   `FEATURES.legalStatus` off.
9. **Social handles** for the footer and the JSON-LD `sameAs` (`site.ts`).
10. **Contact form inbox** for the Formspree/Web3Forms endpoint.
11. **"Six areas of focus" vs "our five areas of focus"** — the 2025 doc says six in the
    section heading and five in the Select Engagements intro. The site builds **six**.
