# Contributing to retask-docs

Thanks for your interest in improving the [Retask](https://retask.work) documentation!
This repo holds the source for the docs site published at https://docs.retask.work,
built with [Astro Starlight](https://starlight.astro.build/).

## Getting started

```bash
yarn install
yarn dev       # local dev server
yarn build     # production build into dist/
yarn preview   # preview the production build
yarn test      # run unit tests (scripts/ only)
```

Requires Node.js >= 24.

## What you can edit

Hand-authored content lives in `src/content/docs/`:

- Guides — `src/content/docs/guides/`
- CLI getting-started and concepts — `src/content/docs/cli/getting-started/` and `cli/concepts/`
- Landing page — `src/content/docs/index.mdx`

New guide pages and the two hand-written CLI pages must also be added to the sidebar
in `astro.config.mjs`.

## What you should NOT edit

Pages under `src/content/docs/cli/reference/` are **auto-generated** from the CLI's
`retask help-llm` manifest. Editing them by hand will be overwritten and CI will fail.
Regenerate them with:

```bash
yarn gen:cli   # requires the `retask` CLI on PATH
```

To change reference output, change the source of truth — the CLI's `help-llm` output
or the rendering logic in `scripts/lib/render.ts` (which is pure and unit-tested).

## Submitting changes

1. Fork the repo and create a branch for your change.
2. Make your edits and run `yarn build` and `yarn test` to confirm everything passes.
3. Open a pull request describing what you changed and why.

## License

By contributing, you agree that your contributions will be licensed under the
[MIT License](LICENSE).
