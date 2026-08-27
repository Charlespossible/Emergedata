import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import type { Leader } from '@/content/types';
import { Dialog } from '@/components/ui/Dialog';
import { LogoMark } from '@/components/ui/Logo';
import { asset } from '@/lib/asset';
import { cn } from '@/lib/cn';

type Props = { leader: Leader; className?: string };

const initials = (name: string) =>
  name
    .replace(/^Dr\.?\s+/i, '')
    .split(/\s+/)
    .filter((part) => /[A-Za-z]/.test(part[0] ?? ''))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

export function TeamCard({ leader, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <article className={cn('group flex h-full flex-col', className)}>
      <LeaderPortrait leader={leader} />

      <h3 className="mt-5 text-h3 text-brand-900">{leader.name}</h3>
      <p className="mt-1 text-small font-medium text-brand-600">{leader.role}</p>
      <p className="mt-3 flex-1 text-small text-ink-600">{leader.teaser}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex min-h-[44px] items-center text-small font-medium text-brand-600 transition duration-150 hover:text-brand-700"
        >
          Read bio
          <span className="sr-only"> for {leader.name}</span>
        </button>

        {leader.email ? (
          <a
            href={`mailto:${leader.email}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-500 transition duration-150 hover:bg-ink-100 hover:text-brand-600"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Email {leader.name}</span>
          </a>
        ) : null}
        {leader.phone ? (
          <a
            href={`tel:${leader.phone.replace(/\s+/g, '')}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-500 transition duration-150 hover:bg-ink-100 hover:text-brand-600"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Call {leader.name}</span>
          </a>
        ) : null}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} title={leader.name} subtitle={leader.role}>
        <div className="flex flex-col gap-4">
          {leader.bio.map((paragraph, index) => (
            <p key={index} className="text-body text-ink-600">
              {paragraph}
            </p>
          ))}
        </div>
        {leader.email || leader.phone ? (
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink-200 pt-5 text-small">
            {leader.email ? (
              <a
                href={`mailto:${leader.email}`}
                className="inline-flex min-h-[44px] items-center gap-2 text-brand-600 hover:text-brand-700"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {leader.email}
              </a>
            ) : null}
            {leader.phone ? (
              <a
                href={`tel:${leader.phone.replace(/\s+/g, '')}`}
                className="inline-flex min-h-[44px] items-center gap-2 text-brand-600 hover:text-brand-700"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {leader.phone}
              </a>
            ) : null}
          </div>
        ) : null}
      </Dialog>
    </article>
  );
}

/**
 * Square portrait. Where no photograph exists we render the brand mark and the person's
 * initials rather than a stock office photo. The same fallback covers a `photo` path whose
 * file is missing, so a not-yet-supplied headshot degrades to the monogram instead of a
 * broken image.
 */
export function LeaderPortrait({ leader, className }: { leader: Leader; className?: string }) {
  const [failed, setFailed] = useState(false);
  const wrapper = cn(
    'relative aspect-square w-full overflow-hidden rounded-xl bg-ink-100',
    className,
  );

  if (!leader.photo || failed) {
    return (
      <div className={cn(wrapper, 'flex items-center justify-center bg-brand-50')}>
        <LogoMark className="absolute h-40 w-40 opacity-[0.07]" />
        <span
          aria-hidden="true"
          className="relative font-display text-4xl font-semibold text-brand-300"
        >
          {initials(leader.name)}
        </span>
        <span className="sr-only">No photograph available for {leader.name}</span>
      </div>
    );
  }

  return (
    <div className={wrapper}>
      <picture>
        <source srcSet={asset(`${leader.photo}.webp`)} type="image/webp" />
        <img
          src={asset(`${leader.photo}.jpg`)}
          alt={`${leader.name}, ${leader.role}`}
          width={640}
          height={640}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top transition duration-150"
        />
      </picture>
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-brand-900/0 transition duration-150 group-hover:bg-brand-900/10"
      />
    </div>
  );
}
