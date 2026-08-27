import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = { children: ReactNode; className?: string; as?: ElementType };

/** The one place horizontal page padding is defined. No ad-hoc padding anywhere else. */
export function Container({ children, className, as: Tag = 'div' }: Props) {
  return (
    <Tag className={cn('mx-auto w-full max-w-container px-5 sm:px-8 lg:px-12', className)}>
      {children}
    </Tag>
  );
}
