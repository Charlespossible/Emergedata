import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/cn';
import { NAV_CTA } from '@/config/nav';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { MobileDrawer } from './MobileDrawer';
import { Nav } from './Nav';

/**
 * Transparent over the hero at the top of the page, solid after 24px of scroll.
 * Inner pages open with a light band, so the header is solid there from the start.
 */
export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrolled = useScrollPosition(24);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const solid = scrolled || !isHome;

  useEffect(() => setDrawerOpen(false), [location.pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition duration-150',
          solid ? 'bg-white/90 ring-1 ring-ink-200 backdrop-blur' : 'bg-transparent',
        )}
      >
        <Container className="flex h-20 items-center justify-between gap-4">
          <Link to="/" className="rounded-md">
            <Logo onDeep={!solid} />
            <span className="sr-only">home</span>
          </Link>

          <div className="flex items-center gap-2">
            <Nav solid={solid} />
            <Link
              to={NAV_CTA.href}
              className={cn(
                'hidden min-h-[44px] items-center rounded-lg px-5 text-small font-medium transition duration-150 lg:inline-flex',
                solid
                  ? 'bg-brand-600 text-white hover:bg-brand-700'
                  : 'bg-white text-brand-900 hover:bg-brand-50',
              )}
            >
              {NAV_CTA.label}
            </Link>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-expanded={drawerOpen}
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center rounded-lg transition duration-150 lg:hidden',
                solid ? 'text-brand-900 hover:bg-ink-100' : 'text-white hover:bg-white/10',
              )}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </Container>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
