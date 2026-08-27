import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { SITE } from '@/config/site';
import App from './App';
import { ServerRoutes } from './routes.server';

export { ROUTE_PATHS } from './routes.shared';

export type Rendered = { html: string; head: string };

/** The subfolder the site is deployed under, e.g. '/' or '/emerge/'. */
export const BASE_URL: string = import.meta.env.BASE_URL;

/** Re-exported so scripts/prerender.mjs builds sitemap URLs from the app's own value. */
export const SITE_URL: string = SITE.url;

/**
 * Renders one route to HTML at build time. Used only by scripts/prerender.mjs —
 * there is no server at runtime; the output is a folder of static files.
 *
 * `url` is the app-level route ('/about'), not the deployed URL. StaticRouter strips the
 * basename off the location it is given, so the basename has to be put back on first or
 * nothing matches when the site lives in a subfolder.
 */
export function render(url: string): Rendered {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const location = `${BASE_URL.replace(/\/$/, '')}${url}`;

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={location} basename={BASE_URL}>
          <App>
            <ServerRoutes />
          </App>
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  );

  const { helmet } = helmetContext;
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ]
        .filter(Boolean)
        .join('\n    ')
    : '';

  return { html, head };
}
