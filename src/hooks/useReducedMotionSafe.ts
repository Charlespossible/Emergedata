import { useEffect, useState } from 'react';

/**
 * True when the visitor has NOT asked for reduced motion. Every entry animation in the
 * app is gated on this — non-negotiable per the design system.
 */
export function useReducedMotionSafe(): boolean {
  const [allowed, setAllowed] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return true;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setAllowed(!query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return allowed;
}
