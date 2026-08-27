import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Adds the hover lift. Omit for static cards that are not links. */
  interactive?: boolean;
};

export function Card({ children, className, as: Tag = 'div', interactive = false }: Props) {
  return (
    <Tag
      className={cn(
        'rounded-xl bg-white p-6 ring-1 ring-ink-200 transition duration-150 sm:p-8',
        interactive && 'hover:-translate-y-0.5 hover:shadow-lg',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
