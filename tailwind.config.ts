import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';

/**
 * All colours are also declared as CSS variables in src/styles/tokens.css.
 * Adding dark mode later means overriding those variables — not editing this file.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EFF4FB', 100: '#DCE7F5', 200: '#B9CEEA', 300: '#8FADDA', 400: '#5B85C4',
          500: '#2F5FA8', 600: '#1F4E88', 700: '#173C6B', 800: '#122E52', 900: '#0D2340', 950: '#081729',
        },
        accent: {
          50: '#FEF2F2', 100: '#FEE2E2', 400: '#F05252', 500: '#DC2626', 600: '#B91C1C', 700: '#991B1B',
        },
        ink: {
          50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1', 400: '#94A3B8',
          500: '#64748B', 600: '#475569', 700: '#334155', 800: '#1E293B', 900: '#0F172A',
        },
        chart: {
          green: '#16A34A', amber: '#F59E0B', teal: '#0D9488', violet: '#7C3AED',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Fraunces Variable', 'Fraunces', 'Georgia', 'Cambria', 'serif'],
      },
      fontSize: {
        display: ['clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h1: ['clamp(2rem, 1.4rem + 2.4vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.625rem, 1.3rem + 1.4vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        h3: ['1.375rem', { lineHeight: '1.3' }],
        lead: ['clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)', { lineHeight: '1.65' }],
        body: ['1rem', { lineHeight: '1.7' }],
        small: ['0.875rem', { lineHeight: '1.6' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.14em', fontWeight: '600' }],
      },
      maxWidth: { container: '1280px' },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'none' } },
        'drawer-in': { from: { transform: 'translateX(100%)' }, to: { transform: 'none' } },
      },
      animation: {
        'fade-up': 'fade-up 600ms cubic-bezier(0.16,1,0.3,1) both',
        'drawer-in': 'drawer-in 240ms cubic-bezier(0.16,1,0.3,1) both',
      },
      transitionDuration: { 150: '150ms' },
    },
  },
  plugins: [typography, animate],
} satisfies Config;
