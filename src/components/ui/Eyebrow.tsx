import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = { children: ReactNode; className?: string; tone?: 'light' | 'dark' };

/**
 * Eyebrow label with the short accent rule. This rule is one of the few sanctioned
 * uses of brand red — see the colour usage law in the design system.
 */
export function Eyebrow({ children, className, tone = 'light' }: Props) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.14em]',
        tone === 'light' ? 'text-brand-600' : 'text-brand-200',
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-accent-500" />
      {children}
    </p>
  );
}
