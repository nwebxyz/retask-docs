# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Public documentation for [Retask](https://retask.work) and the Retask CLI, published at
https://docs.retask.work. Built with **Astro Starlight**. Content lives in
`src/content/docs/` as Markdown/MDX; the sidebar and site config are in `astro.config.mjs`.

## Commands

```bash
yarn dev           # local dev server
yarn build         # production build into dist/
yarn preview       # preview the production build
yarn test          # run the unit tests (vitest run)
yarn gen:cli       # regenerate the CLI command reference (requires `retask` on PATH)
```

Run a single test file or filter by name:

```bash
yarn vitest run scripts/lib/render.test.ts
yarn vitest run -t "groups commands by their group key"
```

Tests only cover `scripts/` (see `vitest.config.ts` → `include: ['scripts/**/*.test.ts']`);
there are no tests for page content itself.

## CLI reference is auto-generated — do not hand-edit

The single most important thing to know: every page under
`src/content/docs/cli/reference/` is **generated**, not authored. Editing those files by
hand will be overwritten and **CI will fail** (`cli-reference-fresh` job runs `yarn
gen:cli` and `git diff --exit-code` against this directory).

The pipeline:

1. `yarn gen:cli` runs `scripts/gen-cli-reference.ts`, which shells out to
   `retask help-llm` to get a JSON `Manifest` (list of command entries).
2. `scripts/lib/render.ts` (`renderAll`) groups commands and renders one Markdown page per
   group. **Grouping key = the token after `retask`** (`retask auth login` → `auth.md`,
   `retask project-config get` → `project-config.md`). Manifest order is preserved.
3. `gen-cli-reference.ts` **wipes the whole reference directory** (`rmSync`) and rewrites it.

To change reference pages, change the source of truth: either the CLI's `help-llm` output
(in the separate `retask` CLI repo) or the rendering logic in `scripts/lib/render.ts`.
`render.ts` is pure and fully unit-tested; `gen-cli-reference.ts` is the I/O shell (spawns
the CLI, touches the filesystem) and is intentionally not tested. Keep that split when
extending generation.

Hand-authored content (safe to edit): everything under `src/content/docs/guides/`, the
`cli/getting-started` and `cli/concepts` pages, and `index.mdx`.

## Sidebar

The sidebar is defined explicitly in `astro.config.mjs`. New **guide** pages and the two
hand-written CLI pages must be added there by hand. The `cli/reference` section uses
`autogenerate`, so generated pages appear automatically — no sidebar edit needed.

## Deploy

Cloudflare Pages, custom domain `docs.retask.work` (see `DEPLOY.md`). The Pages build
command installs the `retask` CLI, runs `gen:cli`, then `build` — so **production always
reflects the latest released CLI**, even if the committed reference pages lag behind.
