import '@testing-library/jest-dom/vitest';

// jsdom implements neither of these; the app guards for both, so stub them for tests.
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = '';
  thresholds: number[] = [];
}
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

window.scrollTo = (() => {}) as typeof window.scrollTo;
