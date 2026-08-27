import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** How long to keep looking for a hash target before giving up and going to the top. */
const HASH_TIMEOUT_MS = 2000;

/**
 * Scroll restoration on route change.
 *
 * A hash needs care: routes are code-split, so on a cold load of `/focus-areas#markets`
 * this effect runs before the lazy page has mounted and the target does not exist yet.
 * We retry each frame until it appears, then fall back to the top if it never does.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    let frame = 0;
    const deadline = performance.now() + HASH_TIMEOUT_MS;
    const id = decodeURIComponent(hash.slice(1));

    const attempt = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
      if (performance.now() < deadline) {
        frame = window.requestAnimationFrame(attempt);
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    };

    frame = window.requestAnimationFrame(attempt);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
