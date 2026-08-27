import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

/**
 * BASE_PATH lets the site live in a subfolder of public_html, e.g. BASE_PATH=/emerge/.
 * It must start and end with a slash. Everything downstream reads it from
 * import.meta.env.BASE_URL, which Vite derives from this value:
 *   - asset and font URLs in the built HTML
 *   - the React Router basename (src/main.tsx, src/entry-server.tsx)
 *   - the generated .htaccess and sitemap.xml (scripts/prerender.mjs)
 */
const BASE_PATH = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  ssr: {
    // react-helmet-async ships CJS; bundle it so the SSR build can call it.
    noExternal: ['react-helmet-async'],
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'router';
            if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) return 'forms';
            if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) return 'react';
          }
          return undefined;
        },
      },
    },
  },
});
