/** First focusable element on every page. Jumps past the header to <main>. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:inline-flex focus:min-h-[44px] focus:items-center focus:rounded-lg focus:bg-brand-600 focus:px-5 focus:text-small focus:font-medium focus:text-white"
    >
      Skip to main content
    </a>
  );
}
