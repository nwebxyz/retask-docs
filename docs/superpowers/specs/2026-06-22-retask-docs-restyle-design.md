# Retask Docs brand restyle — design

**Date:** 2026-06-22
**Status:** Approved (brainstorm)
**Scope:** Brand alignment + light visual polish, within standard Astro Starlight.

## Problem

The docs site (`docs.retask.work`, Astro Starlight) is visually off-brand relative to
the marketing site (`retask.work`, source at
`../nweb-app-frontend/workspaces/retask-frontend/`):

- **No brand mark.** The header logo is a plain text wordmark "Retask" in green — no icon.
- **Stale/wrong palette.** Docs use green `#035A4B` as the accent; the brand is decisively
  **blue** (`#2442AF`). The `brand.css` comment literally still says "green #035A4B" — it
  predates the blue rebrand.
- **Wrong typeface.** Docs use Inter; the brand uses **Plus Jakarta Sans**.
- **Off-brand favicon.** A black/white sparkle/star, not the brand shuffle icon.
- **Unbalanced type scale.** Page and hero `<h1>` are oversized relative to body text
  (Starlight maps `h1` to `5xl`/`4xl`), making headers feel disproportionately large.

## Source of truth (brand tokens)

From `workspaces/ui/theme/brandTokens.ts`:

```
primary:        #2442AF   (deep blue — main brand)
primaryLight:   #DCE7FA
secondary:      #87BFFF   (light blue)
secondaryLight: #B7D8FF
accentWarm:     #FFE6D4
accentWarmDeep: #A04A1F
ink:            #0F1F4A   (heading/text ink)
```

- Marketing font: **Plus Jakarta Sans** (headings weight 700–800, letter-spacing
  ~ -0.02em on h1, -0.015em on h2).
- Brand mark: `public/icons/retask_icon.svg` (the three-arrow "shuffle" icon, colors
  `#2442AF` / `#87BFFF` / `#49BEFF`), shown beside a "Retask" wordmark in `primary` at
  weight 800 in the marketing header.
- `theme-color`: `#2442AF`.

## Decisions (from brainstorm)

1. **Scope:** brand alignment + light visual polish. Stay within standard Starlight —
   no component-internals rewrites, no custom homepage layout.
2. **Typography:** Plus Jakarta Sans **everywhere** (headings + body). Code stays mono.
3. **Logo lockup:** icon + "Retask" + a lighter-weight, muted **"Docs"** suffix
   (à la "Stripe Docs"). Signals the docs site while staying on-brand.
4. **Color modes:** keep **light + dark** (Starlight theme toggle). Map brand blue to both.
5. **Inter dependency:** dropped (full Jakarta).
6. **Homepage hero:** include the shuffle icon as the hero image.

## Design

All changes are CSS / config / asset. **No page content is edited.** Nothing under
`src/content/docs/cli/reference/` is touched, so the `cli-reference-fresh` CI job stays
green; `scripts/**` tests are unaffected.

### 1. Brand palette — `src/styles/brand.css`

Replace the green accent block with the blue brand scale, mapped onto Starlight's accent
variables in both modes. Starlight derives link/active/focus colors from these:

| Variable | Light (`:root[data-theme='light']`) | Dark (`:root`, default) |
|---|---|---|
| `--sl-color-accent` (links, active item) | `#2442AF` (primary) | `~#2f54c9` (mid-blue) |
| `--sl-color-accent-low` (tints, subtle bg) | `#DCE7FA` (primaryLight) | `#16306F` (deep) |
| `--sl-color-accent-high` (hover, high-contrast text) | `#16306F` | `#9DBEFF` (light) |

Note: in dark mode Starlight sets `--sl-color-text-accent: var(--sl-color-accent-high)`,
so the light-blue `accent-high` is what links use on dark — chosen for contrast. In light
mode `--sl-color-text-accent: var(--sl-color-accent)`, i.e. brand `#2442AF`. Exact step
values to be finalized during implementation against live contrast checks; the mapping
intent above is fixed.

### 2. Typography — Plus Jakarta Sans

- Add dependency `@fontsource-variable/plus-jakarta-sans` (v5.2.8, confirmed resolvable).
- `@import` it in `brand.css`; set `--sl-font: 'Plus Jakarta Sans Variable', system-ui,
  -apple-system, sans-serif;`.
- Leave `--sl-font-mono` (code) at Starlight's default.
- Remove `@fontsource-variable/inter` from `package.json` and its `@import`.

### 3. Rebalanced type scale

Starlight maps headings to its `Nxl` scale tokens responsively
(`--sl-text-h1: var(--sl-text-5xl)` on small screens, `var(--sl-text-4xl)` above a
breakpoint, etc.). Override to a calmer modular scale. Because Starlight redefines
`--sl-text-h1..h5` inside a media query, the override must either set the heading tokens at
**both** breakpoints or redefine the underlying `--sl-text-2xl..5xl` primitives — whichever
is cleaner; implementation decides. Target desktop sizes:

| Element | Today (~) | New target |
|---|---|---|
| Page `h1` | ~3rem (4xl) | **2rem** |
| `h2` | ~2.25rem | 1.5rem |
| `h3` | ~1.875rem | 1.25rem |
| `h4` | ~1.5rem | 1.125rem |
| Hero title (`.hero h1`) | large clamp | `clamp(2rem, …, 3rem)` |
| Body | 1rem, line-height 1.75 | unchanged |

Also: heading `font-weight` → 700 (brand), heading letter-spacing ≈ `-0.02em` (h1) /
`-0.015em` (h2) to match the marketing voice. `--sl-line-height-headings` stays ~1.2.

### 4. Logo + favicon

- Copy `retask_icon.svg` from the frontend into `src/assets/` (brand shuffle icon).
- Build two lockup SVGs, each = **icon + "Retask" wordmark + muted "Docs"**:
  - `src/assets/logo-light.svg` — "Retask" in `#2442AF`, "Docs" muted (e.g. `#6B7280`),
    weight 800 / lighter for "Docs", Plus Jakarta Sans.
  - `src/assets/logo-dark.svg` — "Retask" in white/`#E8EEFB`, "Docs" muted-light; the
    icon's deep-blue arrow recolored to a lighter blue (`~#87BFFF`) so it reads on dark.
- Config: `logo: { light: './src/assets/logo-light.svg', dark:
  './src/assets/logo-dark.svg', replacesTitle: true }`. (Starlight swaps light/dark logos on
  `data-theme`, unlike a `prefers-color-scheme` style block — so two files, not one.)
- Replace `public/favicon.svg` with the brand shuffle icon (fixed brand colors are fine for
  the favicon).
- Add `<meta name="theme-color" content="#2442AF">` via Starlight's `head` config.

### 5. Light visual polish (echoing retask.work)

Targeted CSS only — no component internals rewritten:

- **Buttons** (`.sl-link-button`, incl. hero actions): brand blue fill, 10px radius.
- **Cards** (`<Card>`/`<CardGrid>` on homepage & guides): ~12px radius, subtle brand-blue
  border and slight lift on hover.
- **Links:** brand blue, underlined; hover → ink `#0F1F4A`.
- **Homepage hero:** add `hero.image` (the shuffle icon) in `index.mdx`, plus the reduced
  hero title size from §3.

### Files touched

| File | Change |
|---|---|
| `src/styles/brand.css` | Rewrite: font import, palette (light+dark), type scale, polish |
| `astro.config.mjs` | `logo: { light, dark, replacesTitle }`; `head` theme-color |
| `package.json` | + `@fontsource-variable/plus-jakarta-sans`, − `@fontsource-variable/inter` |
| `src/content/docs/index.mdx` | Add `hero.image` (shuffle icon) |
| `src/assets/retask-icon.svg` | New — brand icon (copied from frontend) |
| `src/assets/logo-light.svg` | New — light lockup |
| `src/assets/logo-dark.svg` | New — dark lockup |
| `public/favicon.svg` | Replace with brand shuffle icon |

`src/assets/logo.svg` (old green text wordmark) is removed/replaced.

## Risks & mitigations

- **Responsive type tokens:** Starlight defines `--sl-text-h1..h5` at two breakpoints;
  a naive `:root` override loses to the media query. Mitigation: override at both
  breakpoints or override the `--sl-text-Nxl` primitives. Verify both mobile and desktop.
- **Dark-mode icon contrast:** the icon's deep-blue `#2442AF` arrow is low-contrast on
  Starlight's dark background. Mitigation: dedicated `logo-dark.svg` with a lightened arrow.
- **Don't touch generated reference pages.** Out of scope by construction; double-check the
  diff excludes `src/content/docs/cli/reference/`.
- **Dark-mode link contrast (WCAG):** verify `accent-high` light-blue links meet contrast
  on the dark background; adjust the step if needed.

## Verification

- `yarn build` succeeds.
- `yarn test` (scripts/ unit tests) still green — untouched, but confirm.
- Headless-Chrome screenshots of **home + a guide page**, in **light and dark**, reviewed
  against the brand: blue accent, Jakarta type, icon+wordmark+"Docs" lockup, balanced
  headings, branded favicon/theme-color.
- `git diff --stat` shows no changes under `src/content/docs/cli/reference/`.

## Out of scope

- Custom homepage layout / marketing-grade components / Starlight component overrides.
- Any page-content rewriting.
- Changes to the CLI reference generation pipeline.
