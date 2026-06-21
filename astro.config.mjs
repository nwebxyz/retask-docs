// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.retask.work',
  integrations: [
    starlight({
      title: 'Retask Docs',
      logo: { src: './src/assets/logo.svg', replacesTitle: true },
      customCss: ['./src/styles/brand.css'],
      sidebar: [
        { label: 'Guides', items: [{ autogenerate: { directory: 'guides' } }] },
      ],
    }),
  ],
});
