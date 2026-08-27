import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Eyebrow';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  as?: 'h2' | 'h3';
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = 'light',
  align = 'left',
  as: Tag = 'h2',
  id,
  className,
}: Props) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <Eyebrow tone={tone} className={align === 'center' ? 'justify-center' : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Tag
        id={id}
        className={cn('mt-4 text-h2', tone === 'dark' ? 'text-white' : 'text-brand-900')}
      >
        {title}
      </Tag>
      {lead ? (
        <p
          className={cn(
            'mt-4 max-w-prose text-lead',
            align === 'center' && 'mx-auto',
            tone === 'dark' ? 'text-brand-100' : 'text-ink-600',
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
