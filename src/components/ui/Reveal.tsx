import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger index — 60ms apart, as specified in the motion system. */
  index?: number;
  as?: 'div' | 'li' | 'article';
};

/** Fade-up 16px on entry. A no-op under prefers-reduced-motion (handled in useInView). */
export function Reveal({ children, className, index = 0, as: Tag = 'div' }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={cn('reveal', inView && 'is-visible', className)}
      style={index ? { transitionDelay: `${Math.min(index, 8) * 60}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
