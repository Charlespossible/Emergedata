import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { render as renderRoute } from '@/entry-server';
import { ROUTE_PATHS } from '@/routes.shared';
import { getFocusAreas, getLeaders } from '@/lib/content';

/**
 * The pre-render is what actually ships. These assert that renderToString produces real
 * page markup — not the Suspense fallback — and the right head tags for every route.
 */
describe('pre-render', () => {
  // jsdom makes react-helmet-async think it is in a browser, so it mutates document
  // instead of filling the server context. The real pre-render runs in plain Node.
  beforeAll(() => {
    HelmetProvider.canUseDOM = false;
  });
  afterAll(() => {
    HelmetProvider.canUseDOM = true;
  });

  it('renders real page content for every route, never the loading fallback', () => {
    for (const path of Object.values(ROUTE_PATHS)) {
      const { html } = renderRoute(path);
      expect(html, `${path} rendered the Suspense fallback`).not.toContain('Loading page');
      expect(html.length, `${path} produced almost no markup`).toBeGreaterThan(5000);
      expect(html, `${path} is missing its <h1>`).toContain('<h1');
    }
  });

  it('emits a unique title, description and canonical per route', () => {
    const titles = new Set<string>();
    for (const path of Object.values(ROUTE_PATHS)) {
      const { head } = renderRoute(path);
      const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] ?? '';
      expect(title, `${path} has no title`).not.toBe('');
      titles.add(title);
      expect(head, `${path} has no description`).toMatch(/name="description"/);
      expect(head, `${path} has no canonical`).toMatch(/rel="canonical"/);
      expect(head, `${path} has no og:image`).toMatch(/property="og:image"/);
    }
    expect(titles.size, 'route titles are not unique').toBe(Object.values(ROUTE_PATHS).length);
  });

  it('puts the deep-linkable focus area anchors in the static HTML', () => {
    const { html } = renderRoute(ROUTE_PATHS.focusAreas);
    for (const area of getFocusAreas()) {
      expect(html, `#${area.slug} missing`).toContain(`id="${area.slug}"`);
    }
  });

  it('puts every leader name in the static HTML', () => {
    const { html } = renderRoute(ROUTE_PATHS.leadership);
    for (const leader of getLeaders()) {
      expect(html).toContain(leader.name);
    }
  });

  it('renders the branded 404 for an unknown path', () => {
    const { html, head } = renderRoute('/404');
    expect(html).toContain('could not find that page');
    expect(head).toMatch(/name="robots" content="noindex/);
  });

  it('emits Organization JSON-LD on home and ProfessionalService on focus areas', () => {
    expect(renderRoute('/').head).toContain('"@type":"Organization"');
    expect(renderRoute(ROUTE_PATHS.focusAreas).head).toContain('"@type":"ProfessionalService"');
  });
});
