import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

type Props = { summary: string; children: ReactNode; className?: string };

/** Accessible show/hide. Used where a dialog would be heavier than the content warrants. */
export function Disclosure({ summary, children, className }: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-[44px] items-center gap-2 text-small font-medium text-brand-600 transition duration-150 hover:text-brand-700"
      >
        {summary}
        <ChevronDown
          aria-hidden="true"
          className={cn('h-4 w-4 transition-transform duration-150', open && 'rotate-180')}
        />
      </button>
      <div id={id} hidden={!open} className="pt-3">
        {children}
      </div>
    </div>
  );
}
