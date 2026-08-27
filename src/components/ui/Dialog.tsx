import { useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Secondary line under the title, e.g. a role. */
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

/** Focus-trapped modal dialog. Escape closes; focus returns to the trigger on close. */
export function Dialog({ open, onClose, title, subtitle, children, className }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const labelId = `dialog-${title.replace(/\W+/g, '-').toLowerCase()}`;

  useLockBodyScroll(open);
  useFocusTrap(panelRef, open, onClose);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      {/* Backdrop. Clicking it closes; Escape is handled by the focus trap. */}
      <div
        className="absolute inset-0 bg-brand-950/60 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        className={cn(
          'relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-xl bg-white p-6 shadow-xl sm:rounded-xl sm:p-10',
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-500 transition duration-150 hover:bg-ink-100 hover:text-brand-900"
        >
          <X className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Close</span>
        </button>
        <h2 id={labelId} className="pr-12 text-h3 text-brand-900">
          {title}
        </h2>
        {subtitle ? <p className="mt-1 text-small text-brand-600">{subtitle}</p> : null}
        <div className="mt-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
