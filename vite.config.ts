import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Two entry points, not a router. /faq/ is a separate document so it gets its own title,
 * canonical and FAQPage structured data, and never loads the hero photography.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    cssTarget: 'chrome111',
    rollupOptions: {
      input: {
        main: 'index.html',
        faq: 'faq/index.html',
        team: 'team/index.html',
        services: 'services/index.html',
        packages: 'packages/index.html',
        notfound: '404.html',
        privacy: 'privacy/index.html',
        terms: 'terms/index.html',
        cookies: 'cookies/index.html',
        accessibility: 'accessibility/index.html',
      },
    },
  },
});
