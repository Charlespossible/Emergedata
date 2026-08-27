import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import { Reveal } from './Reveal';

type Tone = 'white' | 'muted' | 'deep' | 'none';

const tones: Record<Tone, string> = {
  white: 'bg-white',
  muted: 'bg-ink-50',
  deep: 'bg-gradient-to-b from-brand-900 to-brand-800 text-brand-100',
  none: '',
};

type Props = {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Set false for sections that manage their own vertical rhythm (e.g. the hero). */
  padded?: boolean;
  /** Set false to opt a section out of the fade-up entry animation. */
  reveal?: boolean;
  'aria-labelledby'?: string;
};

export function Section({
  children,
  tone = 'white',
  id,
  className,
  containerClassName,
  padded = true,
  reveal = true,
  ...rest
}: Props) {
  const body = <Container className={containerClassName}>{children}</Container>;
  return (
    <section
      id={id}
      className={cn(
        tones[tone],
        padded && 'py-16 sm:py-20 lg:py-28',
        id && 'scroll-mt-28',
        className,
      )}
      {...rest}
    >
      {reveal ? <Reveal>{body}</Reveal> : body}
    </section>
  );
}
