import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import FocusAreasPage from '@/pages/FocusAreasPage';
import HomePage from '@/pages/HomePage';
import LeadershipPage from '@/pages/LeadershipPage';
import NotFoundPage from '@/pages/NotFoundPage';
import OurWorkPage from '@/pages/OurWorkPage';
import { RouteTable, type PageMap } from './routes.shared';

/**
 * Eager route table, used only by the build-time pre-render. renderToString does not
 * resolve React.lazy — it would emit the Suspense fallback instead of the page — so the
 * server imports every page directly. The client table stays code-split.
 */
const pages: PageMap = {
  home: HomePage,
  about: AboutPage,
  focusAreas: FocusAreasPage,
  ourWork: OurWorkPage,
  leadership: LeadershipPage,
  contact: ContactPage,
  notFound: NotFoundPage,
};

export function ServerRoutes() {
  return <RouteTable pages={pages} />;
}
