import { useEffect, useRef, useState } from 'react';
import { useReducedMotionSafe } from './useReducedMotionSafe';

type Options = { threshold?: number; rootMargin?: string; once?: boolean };

const DEFAULT_ROOT_MARGIN = '0px 0px -10% 0px';
const DEFAULT_THRESHOLD = 0.15;

/**
 * One IntersectionObserver shared by every revealing element on the page.
 *
 * The Home route alone has ~40 revealing elements; giving each its own observer costs
 * real main-thread time during the initial render. Observers are keyed by their options
 * so a caller with custom settings still gets correct behaviour.
 */
type Callback = (inView: boolean) => void;

const registries = new Map<
  string,
  { observer: IntersectionObserver; callbacks: Map<Element, Callback> }
>();

function getRegistry(threshold: number, rootMargin: string) {
  const key = `${threshold}|${rootMargin}`;
  let registry = registries.get(key);
  if (!registry) {
    const callbacks = new Map<Element, Callback>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) callbacks.get(entry.target)?.(entry.isIntersecting);
      },
      { threshold, rootMargin },
    );
    registry = { observer, callbacks };
    registries.set(key, registry);
  }
  return registry;
}

/**
 * Entry-animation trigger. Under prefers-reduced-motion it reports `true` immediately
 * and never observes anything, so content is present without movement.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = DEFAULT_THRESHOLD,
  rootMargin = DEFAULT_ROOT_MARGIN,
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const motionOk = useReducedMotionSafe();
  const [inView, setInView] = useState(!motionOk);

  useEffect(() => {
    if (!motionOk) {
      setInView(true);
      return;
    }
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const { observer, callbacks } = getRegistry(threshold, rootMargin);

    const onChange = (visible: boolean) => {
      if (visible) {
        setInView(true);
        if (once) {
          callbacks.delete(node);
          observer.unobserve(node);
        }
      } else if (!once) {
        setInView(false);
      }
    };

    callbacks.set(node, onChange);
    observer.observe(node);

    return () => {
      callbacks.delete(node);
      observer.unobserve(node);
    };
  }, [motionOk, threshold, rootMargin, once]);

  return { ref, inView } as const;
}
