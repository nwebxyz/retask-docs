# retask-docs

Public documentation for [Retask](https://retask.work) and the Retask CLI, published at https://docs.retask.work.

Built with [Astro Starlight](https://starlight.astro.build).

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## CLI command reference

Pages under `src/content/docs/cli/reference/` are **auto-generated** from the CLI's
`retask help-llm` manifest — do not edit them by hand. Regenerate with:

```bash
npm run gen:cli   # requires the `retask` CLI on PATH
```

CI fails if the committed reference is stale; the production build regenerates from
the latest released CLI.
