/**
 * Resolves a root-relative asset path against the deploy base.
 *
 * Content files write paths as they sit in `public/` — `/images/team/kenneth-apeh`. When
 * the site is deployed into a subfolder of public_html (BASE_PATH=/emerge/), those paths
 * must become `/emerge/images/...` or the browser fetches them from the domain root and
 * gets a 404. Vite rewrites the URLs it can see in the HTML and CSS itself; anything
 * assembled at runtime from a string in `src/content/` has to come through here.
 */
const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const asset = (pathFromRoot: string): string => `${BASE}${pathFromRoot.replace(/^\//, '')}`;
