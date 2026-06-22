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
        {
          label: 'Guides',
          items: [
            { label: 'Getting started', slug: 'guides/getting-started' },
            { label: 'Workspaces', slug: 'guides/workspaces' },
            { label: 'Projects', slug: 'guides/projects' },
            { label: 'Tasks', slug: 'guides/tasks' },
            { label: 'Sandboxes', slug: 'guides/sandboxes' },
            { label: 'Sessions', slug: 'guides/sessions' },
            { label: 'Agents', slug: 'guides/agents' },
            { label: 'Integrations', slug: 'guides/integrations' },
          ],
        },
        {
          label: 'CLI',
          items: [
            { label: 'Getting started', slug: 'cli/getting-started' },
            { label: 'Core concepts', slug: 'cli/concepts' },
            {
              label: 'Command reference',
              items: [{ autogenerate: { directory: 'cli/reference' } }],
            },
          ],
        },
      ],
    }),
  ],
});
