import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  output: 'static',
  site: 'https://kunn-21.github.io',
  base: '/portfolio',
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'esbuild',
    },
  },
});
