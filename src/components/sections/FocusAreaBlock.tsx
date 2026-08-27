import { Check } from 'lucide-react';
import type { FocusArea } from '@/content/types';
import { NumeralBadge } from '@/components/ui/NumeralBadge';
import { Reveal } from '@/components/ui/Reveal';
import { focusColor } from '@/components/ui/focusColor';
import { cn } from '@/lib/cn';

type Props = { area: FocusArea; alternate?: boolean };

/**
 * One area of focus. Rendered inside the page container's right-hand column, so it owns
 * its own inner padding — alternating blocks carry a tinted panel rather than a full-bleed
 * band, which is not available inside a column.
 */
export function FocusAreaBlock({ area, alternate = false }: Props) {
  return (
    <article
      id={area.slug}
      className={cn(
        'scroll-mt-28 rounded-xl px-0 py-12 sm:px-6 lg:px-8 lg:py-14',
        alternate && 'bg-ink-50',
      )}
    >
      <Reveal>
        <div className="flex items-center gap-4">
          <NumeralBadge color={area.color} size="lg">
            {area.number}
          </NumeralBadge>
          <h2 className="text-h2 text-brand-900">{area.title}</h2>
        </div>

        <p className="mt-6 max-w-prose text-lead text-ink-600">{area.intro}</p>

        <h3 className="mt-10 text-eyebrow font-semibold uppercase tracking-[0.14em] text-ink-500">
          What we do
        </h3>
        <ul className="mt-5 grid gap-x-8 gap-y-3 lg:grid-cols-2">
          {area.capabilities.map((capability) => (
            <li key={capability} className="flex gap-3 text-small text-ink-600">
              <Check
                aria-hidden="true"
                className={cn('mt-0.5 h-4 w-4 shrink-0', focusColor[area.color].icon)}
              />
              <span>{capability}</span>
            </li>
          ))}
        </ul>

        {/* A service line rather than a research capability, so it gets a raised panel of
            its own. `bg-white` reads as lifted on the tinted blocks and is held by the ring
            on the plain ones, so one treatment works in both positions. */}
        {area.highlight ? (
          <div className="mt-10 overflow-hidden rounded-xl bg-white ring-1 ring-ink-200">
            <span aria-hidden="true" className={cn('block h-1', focusColor[area.color].rule)} />
            <div className="p-6 sm:p-7">
              <h3 className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-brand-600">
                {area.highlight.title}
              </h3>
              <p className="mt-4 max-w-prose text-body text-ink-600">{area.highlight.body}</p>
            </div>
          </div>
        ) : null}

        {area.worksWith ? (
          <div className={cn('mt-10 border-l-2 pl-5', focusColor[area.color].border)}>
            <p className="max-w-prose text-small text-ink-600">{area.worksWith}</p>
          </div>
        ) : null}
      </Reveal>
    </article>
  );
}
