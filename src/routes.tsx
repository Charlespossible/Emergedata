import { lazy } from 'react';
import HomePage from '@/pages/HomePage';
import { RouteTable, type PageMap } from './routes.shared';

/** Home is eager (it is the LCP route); every other page is code-split. */
const pages: PageMap = {
  home: HomePage,
  about: lazy(() => import('@/pages/AboutPage')),
  focusAreas: lazy(() => import('@/pages/FocusAreasPage')),
  ourWork: lazy(() => import('@/pages/OurWorkPage')),
  leadership: lazy(() => import('@/pages/LeadershipPage')),
  contact: lazy(() => import('@/pages/ContactPage')),
  notFound: lazy(() => import('@/pages/NotFoundPage')),
};

export function AppRoutes() {
  return <RouteTable pages={pages} />;
}
