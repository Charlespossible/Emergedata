import { useEffect, useState } from 'react';
import type { FocusArea } from '@/content/types';
import { focusColor } from '@/components/ui/focusColor';
import { cn } from '@/lib/cn';

type Props = { areas: FocusArea[] };

/**
 * Sticky index of the six areas with an active highlight driven by IntersectionObserver.
 * Becomes a horizontally scrollable chip row below lg.
 */
export function FocusAreaRail({ areas }: Props) {
  const [active, setActive] = useState(areas[0]?.slug ?? '');

  useEffect(() => {
    const sections = areas
      .map((area) => document.getElementById(area.slug))
      .filter((node): node is HTMLElement => Boolean(node));

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [areas]);

  return (
    <nav aria-label="Areas of focus" className="min-w-0 lg:sticky lg:top-28 lg:self-start">
      <h2 className="sr-only">Jump to an area of focus</h2>
      <ul className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0">
        {areas.map((area) => {
          const isActive = active === area.slug;
          return (
            <li key={area.slug} className="snap-start">
              <a
                href={`#${area.slug}`}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'flex min-h-[44px] shrink-0 items-center gap-3 whitespace-nowrap rounded-full px-4 text-small font-medium ring-1 transition duration-150 lg:whitespace-normal lg:rounded-lg lg:px-3',
                  isActive
                    ? 'bg-brand-50 text-brand-700 ring-brand-200'
                    : 'text-ink-600 ring-ink-200 hover:text-brand-600 lg:ring-transparent lg:hover:bg-ink-50',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'h-1.5 w-1.5 shrink-0 rounded-full transition duration-150',
                    isActive ? focusColor[area.color].dot : 'bg-ink-300',
                  )}
                />
                <span className={cn('tabular-nums', isActive ? 'text-brand-500' : 'text-ink-500')}>
                  {area.number}
                </span>
                {area.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
