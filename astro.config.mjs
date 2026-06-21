// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.retask.work',
  integrations: [
    starlight({
      title: 'Retask Docs',
      sidebar: [
        { label: 'Guides', items: [{ autogenerate: { directory: 'guides' } }] },
      ],
    }),
  ],
});
