import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { focusColor, type FocusColorName } from './focusColor';

type Props = { children: ReactNode; color?: FocusColorName; className?: string };

/** Small sector label. Colour is carried by the dot and the text, never a fill. */
export function Tag({ children, color, className }: Props) {
  const tone = color ? focusColor[color] : undefined;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-ink-50 px-3 py-1 text-xs font-medium text-ink-600 ring-1 ring-ink-200',
        className,
      )}
    >
      {tone ? (
        <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full', tone.dot)} />
      ) : null}
      {children}
    </span>
  );
}
