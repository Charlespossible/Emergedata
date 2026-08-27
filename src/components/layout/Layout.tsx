import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { ScrollToTop } from './ScrollToTop';
import { SkipLink } from './SkipLink';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <ScrollToTop />
      <Header />
      <main id="main" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
