// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.retask.work',
  integrations: [
    starlight({
      title: 'Retask Docs',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
      head: [
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#2442AF' },
        },
      ],
      // Top nav lives inside our SocialIcons component.
      components: {
        SocialIcons: './src/components/SocialIcons.astro',
      },
      // Code blocks: framed, copy button, brand-matched light/dark themes.
      expressiveCode: {
        themes: ['github-dark', 'github-light'],
        styleOverrides: {
          borderRadius: '0.5rem',
          borderColor: 'var(--sl-color-gray-5)',
          frames: {
            shadowColor: 'transparent',
          },
        },
      },
      customCss: ['./src/styles/brand.css'],
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'Concepts', slug: 'guides/concepts' },
            { label: 'Getting started', slug: 'guides/getting-started' },
            { label: 'Run an AI Agent on a task', slug: 'guides/run-agent-on-task' },
            { label: 'Workspaces', slug: 'guides/workspaces' },
            { label: 'Projects', slug: 'guides/projects' },
            { label: 'Tasks', slug: 'guides/tasks' },
            { label: 'Agents', slug: 'guides/agents' },
            { label: 'Sandboxes', slug: 'guides/sandboxes' },
            { label: 'Sessions', slug: 'guides/sessions' },
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
