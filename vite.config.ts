import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Separate documents, not a router. Each sub-page is its own entry so it gets its own title and
 * canonical, and only the home page loads the hero photography.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    cssTarget: 'chrome111',
    rollupOptions: {
      input: {
        main: 'index.html',
        team: 'team/index.html',
        landscaping: 'landscaping/index.html',
        'lawn-care': 'lawn-care/index.html',
        'snow-removal': 'snow-removal/index.html',
        programs: 'programs/index.html',
        reviews: 'reviews/index.html',
        notfound: '404.html',
        privacy: 'privacy/index.html',
        terms: 'terms/index.html',
        cookies: 'cookies/index.html',
        accessibility: 'accessibility/index.html',
      },
    },
  },
});
