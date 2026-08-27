import { Suspense, type ComponentType } from 'react';
import { Route, Routes } from 'react-router-dom';
import { FEATURES } from '@/config/features';

/**
 * The canonical route list. Both the client route table (code-split, src/routes.tsx)
 * and the server one (eager, src/routes.server.tsx) are built from this, and
 * scripts/prerender.mjs pre-renders exactly these paths. Add a route here, once.
 */
export const ROUTE_PATHS = {
  home: '/',
  about: '/about',
  focusAreas: '/focus-areas',
  ourWork: '/our-work',
  leadership: '/leadership',
  contact: '/contact',
} as const;

export type RouteId = keyof typeof ROUTE_PATHS;

export type PageMap = Record<RouteId, ComponentType> & { notFound: ComponentType };

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <span
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-brand-600"
      />
    </div>
  );
}

/**
 * The <Suspense> boundary lives here, not in the client table, so that the pre-render
 * emits the same boundary markers the client expects. Without it hydration fails and
 * React throws away the pre-rendered DOM to re-render from scratch.
 *
 * While FEATURES.blog is false the /blog route is not registered at all, so /blog
 * falls through to the 404 page.
 */
export function RouteTable({ pages }: { pages: PageMap }) {
  const { notFound: NotFound } = pages;
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {(Object.keys(ROUTE_PATHS) as RouteId[]).map((id) => {
          const Page = pages[id];
          return <Route key={id} path={ROUTE_PATHS[id]} element={<Page />} />;
        })}
        {FEATURES.blog ? <Route path="/blog" element={<NotFound />} /> : null}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
