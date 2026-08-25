// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio-seven-hazel-24.vercel.app',
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});
