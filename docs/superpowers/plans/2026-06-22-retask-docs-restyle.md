# Retask Docs Brand Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align `docs.retask.work` (Astro Starlight) with the retask.work brand — blue palette, Plus Jakarta Sans, an icon+wordmark+"Docs" logo, a balanced heading scale, and light visual polish.

**Architecture:** Pure presentation change — CSS (`src/styles/brand.css`), Starlight config (`astro.config.mjs`), the font dependency (`package.json`), three brand SVGs in `src/assets/`, the favicon, and one frontmatter line in `index.mdx`. No page content is rewritten. Nothing under `src/content/docs/cli/reference/` is touched, so the `cli-reference-fresh` CI job stays green and the `scripts/**` vitest suite is unaffected.

**Tech Stack:** Astro Starlight `^0.40.0`, `@fontsource-variable/plus-jakarta-sans`, yarn, headless Chrome for visual verification.

## Testing approach (read first)

This repo's tests cover **only** `scripts/**` (`vitest.config.ts` → `include: ['scripts/**/*.test.ts']`); there are deliberately no tests for page content or styling. Classic unit-test TDD does not apply to a CSS/asset theming change. Each task is therefore gated by **two concrete, observable checks** instead of a unit test:

1. **Build gate:** `yarn build` exits 0 (catches invalid CSS imports, bad config, missing assets).
2. **Visual gate:** a headless-Chrome screenshot is captured and **read/inspected** to confirm the specific change. The exact command and what to look for are in each task.

The dev server should be running for screenshots:
```bash
yarn dev   # http://localhost:4321/  (leave running in a background shell)
```
Screenshot helper used throughout (capture, then read the PNG and confirm the stated expectation):
```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
shot() { "$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size="${3:-1440}",1600 --screenshot="/tmp/retask-shots/$2.png" "http://localhost:4321/$1" 2>/dev/null; }
mkdir -p /tmp/retask-shots
```
Dark-mode screenshots: Starlight persists theme via `localStorage`/`data-theme`; headless Chrome can't toggle it via flags. To verify dark mode, append `--screenshot` after navigating with the `?` is not enough — instead set the prefers-color-scheme by adding the Chrome flag `--force-dark-mode` is unreliable for Starlight. Practical approach: verify dark mode in a real browser tab at `http://localhost:4321/` by clicking the theme toggle, OR temporarily set `<html data-theme="dark">` is automatic when system is dark. Simplest: capture with the OS in dark appearance, or visually confirm dark mode once at the end (Task 6). Light-mode screenshots are the per-task gate.

## Global Constraints

- **Package manager: yarn** (not npm). Engine: **Node >= 24**.
- **Never edit** anything under `src/content/docs/cli/reference/` — it is generated; CI fails on drift.
- **Do not** touch `scripts/**`, `gen:cli`, or the reference pipeline.
- Brand hexes (from `ui/theme/brandTokens.ts`): primary `#2442AF`, primaryLight `#DCE7FA`, secondary `#87BFFF`, secondaryLight `#B7D8FF`, ink `#0F1F4A`.
- Font CSS family name for the variable package is **`'Plus Jakarta Sans Variable'`**.
- Starlight heading tokens are redefined at `@media (min-width: 50em)` — any heading-size override MUST be re-asserted at that breakpoint.
- Work on branch `restyle-docs-brand` (already created; the spec commit is its first commit).

---

### Task 1: Switch the typeface to Plus Jakarta Sans

**Files:**
- Modify: `package.json` (dependencies)
- Modify: `src/styles/brand.css` (rewrite — font import + brand token vars)

**Interfaces:**
- Produces: CSS custom properties `--retask-primary`, `--retask-primary-light`, `--retask-secondary`, `--retask-ink` consumed by Tasks 3 & 5; sets `--sl-font` to Plus Jakarta Sans.

- [ ] **Step 1: Swap the font dependency**

Edit `package.json` dependencies: remove the Inter line, add Plus Jakarta Sans. Result block:

```json
  "dependencies": {
    "@astrojs/starlight": "^0.40.0",
    "@fontsource-variable/plus-jakarta-sans": "^5.2.8",
    "astro": "^6.4.5",
    "sharp": "^0.34.5"
  },
```

- [ ] **Step 2: Install**

Run: `yarn install`
Expected: completes 0; `node_modules/@fontsource-variable/plus-jakarta-sans/` now exists, `inter` is gone.

- [ ] **Step 3: Rewrite `src/styles/brand.css` with the font + brand tokens**

Replace the entire file with:

```css
/* Self-hosted Plus Jakarta Sans — matches the marketing site (retask.work) */
@import '@fontsource-variable/plus-jakarta-sans';

/* ---- Retask brand tokens (from ui/theme/brandTokens) ---- */
:root {
  --retask-primary: #2442af;
  --retask-primary-light: #dce7fa;
  --retask-secondary: #87bfff;
  --retask-ink: #0f1f4a;

  /* Brand font everywhere; code stays on Starlight's mono stack */
  --sl-font: 'Plus Jakarta Sans Variable', system-ui, -apple-system, sans-serif;
}
```

- [ ] **Step 4: Build gate**

Run: `yarn build`
Expected: exits 0 (confirms the `@import` resolves).

- [ ] **Step 5: Visual gate**

Run: `shot guides/getting-started/ t1-font` then read `/tmp/retask-shots/t1-font.png`.
Expected: body and headings now render in Plus Jakarta Sans (rounder, more geometric than Inter — note the single-story `a`, the `t` terminal). Sidebar text changed too.

- [ ] **Step 6: Commit**

```bash
git add package.json yarn.lock src/styles/brand.css
git commit -m "style: switch docs typeface to Plus Jakarta Sans"
```

---

### Task 2: Apply the brand blue palette (replace green accent)

**Files:**
- Modify: `src/styles/brand.css` (append accent-palette sections)

**Interfaces:**
- Consumes: brand token vars from Task 1.
- Produces: Starlight accent variables mapped to brand blue for both `:root` (dark) and `:root[data-theme='light']`.

- [ ] **Step 1: Append the accent palette to `src/styles/brand.css`**

Append (after the brand-tokens block):

```css
/* ---- Accent palette: dark mode (Starlight default :root) ---- */
:root {
  --sl-color-accent-low: #16306f;
  --sl-color-accent: #2f54c9;
  --sl-color-accent-high: #9dbeff; /* links/text on dark — lightened for contrast */
}

/* ---- Accent palette: light mode ---- */
:root[data-theme='light'] {
  --sl-color-accent-low: #dce7fa;
  --sl-color-accent: #2442af; /* brand primary — links, active sidebar item */
  --sl-color-accent-high: #16306f;
}
```

- [ ] **Step 2: Build gate**

Run: `yarn build`
Expected: exits 0.

- [ ] **Step 3: Visual gate (light)**

Run: `shot guides/getting-started/ t2-accent` then read the PNG.
Expected: the active sidebar item ("Getting started") background is **brand blue `#2442AF`**, not green; the in-content "CLI" link is brand blue. No green anywhere.

- [ ] **Step 4: Commit**

```bash
git add src/styles/brand.css
git commit -m "style: replace green accent with brand blue (#2442AF)"
```

---

### Task 3: Rebalance the heading type scale

**Files:**
- Modify: `src/styles/brand.css` (append type-scale + heading sections)

**Interfaces:**
- Consumes: nothing new.
- Produces: smaller heading tokens at both breakpoints; heading weight 700 with brand tracking.

- [ ] **Step 1: Append the type scale to `src/styles/brand.css`**

Starlight sets the heading tokens in base `:root` AND again at `@media (min-width: 50em)` (where `h1` becomes `5xl`/42px). Re-assert ours in both. Append:

```css
/* ---- Balanced heading scale (docs-friendly, not marketing-sized) ---- */
:root {
  --sl-line-height-headings: 1.25;
  --sl-text-h1: 2rem; /* 32px (was 4xl/35px on mobile) */
  --sl-text-h2: 1.5rem; /* 24px */
  --sl-text-h3: 1.25rem; /* 20px */
  --sl-text-h4: 1.125rem; /* 18px */
  --sl-text-h5: 1rem;
}

/* Re-assert at the breakpoint where Starlight bumps h1 to 5xl (42px) */
@media (min-width: 50em) {
  :root {
    --sl-text-h1: 2rem;
    --sl-text-h2: 1.5rem;
    --sl-text-h3: 1.25rem;
    --sl-text-h4: 1.125rem;
    --sl-text-h5: 1rem;
  }
}

/* Heading weight + tracking to match the brand voice */
.sl-markdown-content :is(h1, h2, h3, h4),
.content-panel h1 {
  font-weight: 700;
  letter-spacing: -0.018em;
}

/* Splash homepage hero title — give it a dedicated, smaller clamp */
.hero h1 {
  font-size: clamp(2rem, 1.2rem + 3vw, 3rem);
  letter-spacing: -0.02em;
}
```

- [ ] **Step 2: Build gate**

Run: `yarn build`
Expected: exits 0.

- [ ] **Step 3: Visual gate — content page**

Run: `shot guides/getting-started/ t3-headings` then read the PNG.
Expected: the page `<h1>` "Getting started" is noticeably smaller (~32px) and better balanced against body text than before; still clearly the largest element.

- [ ] **Step 4: Visual gate — homepage hero**

Run: `shot "" t3-hero` then read the PNG.
Expected: the "Retask documentation" hero title is materially smaller than the previous oversized version (caps at ~3rem on desktop), no longer dominating the viewport.

- [ ] **Step 5: Commit**

```bash
git add src/styles/brand.css
git commit -m "style: rebalance heading scale for docs readability"
```

---

### Task 4: Brand logo lockup, favicon, and theme-color

**Files:**
- Create: `src/assets/retask-icon.svg` (brand shuffle icon, for the hero in Task 5)
- Create: `src/assets/logo-light.svg` (icon + "Retask" + muted "Docs", light)
- Create: `src/assets/logo-dark.svg` (dark variant — recolored icon + light wordmark)
- Delete: `src/assets/logo.svg` (old green text wordmark)
- Modify: `public/favicon.svg` (replace sparkle with brand icon)
- Modify: `astro.config.mjs` (logo `{ light, dark, replacesTitle }`; `head` theme-color)

**Interfaces:**
- Consumes: nothing.
- Produces: `src/assets/retask-icon.svg` consumed by Task 5's hero image.

Note on fidelity: the wordmark inside an `<img>`-rendered SVG cannot load the page's web font, so it specifies `'Plus Jakarta Sans', system-ui, …` and falls back to the system sans — same approach the existing logo used. The icon colors and the muted "Docs" are fully controlled.

- [ ] **Step 1: Create `src/assets/retask-icon.svg`** (brand shuffle icon)

```svg
<svg width="32" height="32" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Retask">
  <g style="mix-blend-mode:multiply">
    <path d="M64 320a64.021333 64.021333 0 0 1 0-128h64c81.92 0 155.904 31.744 212.48 82.432a378.624 378.624 0 0 0-63.488 117.824C241.792 348.544 188.48 320 128 320H64z" fill="#49BEFF"/>
    <path d="M877.248 594.688l128 128c12.48 12.48 18.752 28.864 18.752 45.248s-6.272 32.768-18.752 45.248l-128 128a64.106667 64.106667 0 0 1-69.76 13.888A64.042667 64.042667 0 0 1 768 895.936V832h-128c-81.92 0-155.904-31.68-212.544-82.368a380.416 380.416 0 0 0 63.552-117.888C526.208 675.52 579.52 704 640 704h128v-64.064c0-25.856 15.616-49.28 39.488-59.136a64.213333 64.213333 0 0 1 69.76 13.888z" fill="#87BFFF"/>
  </g>
  <path d="M640 320a192 192 0 0 0-192 192c0 176.768-143.296 320-320 320H64a64 64 0 1 1 0-128h64a192 192 0 0 0 192-192c0-176.704 143.296-320 320-320h128V127.936c0-25.856 15.616-49.28 39.488-59.136a64.213333 64.213333 0 0 1 69.76 13.888l128 128c12.48 12.48 18.752 28.864 18.752 45.248s-6.272 32.768-18.752 45.248l-128 128a64.106667 64.106667 0 0 1-69.76 13.888A64.042667 64.042667 0 0 1 768 383.936V320h-128z" fill="#2442AF"/>
</svg>
```

- [ ] **Step 2: Create `src/assets/logo-light.svg`** (lockup, light)

Icon scaled into 28px (`scale(0.02734)`), wordmark in brand blue, muted "Docs":

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="172" height="32" viewBox="0 0 172 32" role="img" aria-label="Retask Docs">
  <g transform="translate(0 2) scale(0.02734)">
    <g style="mix-blend-mode:multiply">
      <path d="M64 320a64.021333 64.021333 0 0 1 0-128h64c81.92 0 155.904 31.744 212.48 82.432a378.624 378.624 0 0 0-63.488 117.824C241.792 348.544 188.48 320 128 320H64z" fill="#49BEFF"/>
      <path d="M877.248 594.688l128 128c12.48 12.48 18.752 28.864 18.752 45.248s-6.272 32.768-18.752 45.248l-128 128a64.106667 64.106667 0 0 1-69.76 13.888A64.042667 64.042667 0 0 1 768 895.936V832h-128c-81.92 0-155.904-31.68-212.544-82.368a380.416 380.416 0 0 0 63.552-117.888C526.208 675.52 579.52 704 640 704h128v-64.064c0-25.856 15.616-49.28 39.488-59.136a64.213333 64.213333 0 0 1 69.76 13.888z" fill="#87BFFF"/>
    </g>
    <path d="M640 320a192 192 0 0 0-192 192c0 176.768-143.296 320-320 320H64a64 64 0 1 1 0-128h64a192 192 0 0 0 192-192c0-176.704 143.296-320 320-320h128V127.936c0-25.856 15.616-49.28 39.488-59.136a64.213333 64.213333 0 0 1 69.76 13.888l128 128c12.48 12.48 18.752 28.864 18.752 45.248s-6.272 32.768-18.752 45.248l-128 128a64.106667 64.106667 0 0 1-69.76 13.888A64.042667 64.042667 0 0 1 768 383.936V320h-128z" fill="#2442AF"/>
  </g>
  <text x="40" y="22" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" letter-spacing="-0.4">
    <tspan fill="#2442AF">Retask</tspan><tspan dx="6" font-weight="600" fill="#6B7280">Docs</tspan>
  </text>
</svg>
```

- [ ] **Step 3: Create `src/assets/logo-dark.svg`** (dark variant)

Drop `mix-blend-mode:multiply` (multiply turns light arrows dark on a dark background) and lighten the front arrow; wordmark in white with muted-light "Docs":

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="172" height="32" viewBox="0 0 172 32" role="img" aria-label="Retask Docs">
  <g transform="translate(0 2) scale(0.02734)">
    <path d="M64 320a64.021333 64.021333 0 0 1 0-128h64c81.92 0 155.904 31.744 212.48 82.432a378.624 378.624 0 0 0-63.488 117.824C241.792 348.544 188.48 320 128 320H64z" fill="#49BEFF"/>
    <path d="M877.248 594.688l128 128c12.48 12.48 18.752 28.864 18.752 45.248s-6.272 32.768-18.752 45.248l-128 128a64.106667 64.106667 0 0 1-69.76 13.888A64.042667 64.042667 0 0 1 768 895.936V832h-128c-81.92 0-155.904-31.68-212.544-82.368a380.416 380.416 0 0 0 63.552-117.888C526.208 675.52 579.52 704 640 704h128v-64.064c0-25.856 15.616-49.28 39.488-59.136a64.213333 64.213333 0 0 1 69.76 13.888z" fill="#87BFFF"/>
    <path d="M640 320a192 192 0 0 0-192 192c0 176.768-143.296 320-320 320H64a64 64 0 1 1 0-128h64a192 192 0 0 0 192-192c0-176.704 143.296-320 320-320h128V127.936c0-25.856 15.616-49.28 39.488-59.136a64.213333 64.213333 0 0 1 69.76 13.888l128 128c12.48 12.48 18.752 28.864 18.752 45.248s-6.272 32.768-18.752 45.248l-128 128a64.106667 64.106667 0 0 1-69.76 13.888A64.042667 64.042667 0 0 1 768 383.936V320h-128z" fill="#9DBEFF"/>
  </g>
  <text x="40" y="22" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" letter-spacing="-0.4">
    <tspan fill="#FFFFFF">Retask</tspan><tspan dx="6" font-weight="600" fill="#94A3B8">Docs</tspan>
  </text>
</svg>
```

- [ ] **Step 4: Replace `public/favicon.svg`** with the brand icon

Overwrite the file with:

```svg
<svg width="128" height="128" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Retask">
  <path d="M64 320a64.021333 64.021333 0 0 1 0-128h64c81.92 0 155.904 31.744 212.48 82.432a378.624 378.624 0 0 0-63.488 117.824C241.792 348.544 188.48 320 128 320H64z" fill="#49BEFF"/>
  <path d="M877.248 594.688l128 128c12.48 12.48 18.752 28.864 18.752 45.248s-6.272 32.768-18.752 45.248l-128 128a64.106667 64.106667 0 0 1-69.76 13.888A64.042667 64.042667 0 0 1 768 895.936V832h-128c-81.92 0-155.904-31.68-212.544-82.368a380.416 380.416 0 0 0 63.552-117.888C526.208 675.52 579.52 704 640 704h128v-64.064c0-25.856 15.616-49.28 39.488-59.136a64.213333 64.213333 0 0 1 69.76 13.888z" fill="#87BFFF"/>
  <path d="M640 320a192 192 0 0 0-192 192c0 176.768-143.296 320-320 320H64a64 64 0 1 1 0-128h64a192 192 0 0 0 192-192c0-176.704 143.296-320 320-320h128V127.936c0-25.856 15.616-49.28 39.488-59.136a64.213333 64.213333 0 0 1 69.76 13.888l128 128c12.48 12.48 18.752 28.864 18.752 45.248s-6.272 32.768-18.752 45.248l-128 128a64.106667 64.106667 0 0 1-69.76 13.888A64.042667 64.042667 0 0 1 768 383.936V320h-128z" fill="#2442AF"/>
</svg>
```

- [ ] **Step 5: Delete the old logo**

Run: `git rm src/assets/logo.svg`

- [ ] **Step 6: Wire up `astro.config.mjs`**

In the `starlight({ … })` options, replace the `logo:` line and add a `head:` entry. The `title: 'Retask Docs'` stays (drives `<title>`/SEO). Result (top of the starlight options):

```js
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
      customCss: ['./src/styles/brand.css'],
```

- [ ] **Step 7: Build gate**

Run: `yarn build`
Expected: exits 0 (confirms both logo SVGs and the favicon resolve and the config is valid).

- [ ] **Step 8: Visual gate (light)**

Run: `shot guides/getting-started/ t4-logo` then read the PNG.
Expected: header shows the **shuffle icon + "Retask" (blue) + muted "Docs"** lockup, replacing the old green text wordmark. The browser-tab favicon (visible in some captures) is the blue shuffle icon.

- [ ] **Step 9: Commit**

```bash
git add astro.config.mjs src/assets/retask-icon.svg src/assets/logo-light.svg src/assets/logo-dark.svg public/favicon.svg
git rm --cached src/assets/logo.svg 2>/dev/null; true
git commit -m "feat: add brand logo lockup, favicon, and theme-color"
```

---

### Task 5: Light visual polish + hero icon

**Files:**
- Modify: `src/styles/brand.css` (append polish section)
- Modify: `src/content/docs/index.mdx` (add hero image)

**Interfaces:**
- Consumes: `--retask-*` tokens (Task 1); `src/assets/retask-icon.svg` (Task 4).

- [ ] **Step 1: Append the polish section to `src/styles/brand.css`**

```css
/* ---- Light visual polish (echoes retask.work) ---- */
/* Primary CTA buttons (e.g. hero "Get started") */
.sl-link-button.primary {
  background: var(--retask-primary);
  border-radius: 10px;
}
:root[data-theme='light'] .sl-link-button.primary:hover {
  background: var(--retask-ink);
}

/* Cards on the homepage and in guides */
.card {
  border-radius: 12px;
  transition: border-color 0.15s ease, transform 0.15s ease;
}
.card:hover {
  border-color: var(--retask-secondary);
  transform: translateY(-2px);
}

/* Content links: brand blue with comfortable underline offset */
.sl-markdown-content a:not(:where(.not-content *)) {
  text-underline-offset: 0.2em;
}
:root[data-theme='light'] .sl-markdown-content a:not(:where(.not-content *)):hover {
  color: var(--retask-ink);
}
```

- [ ] **Step 2: Add the hero icon to `src/content/docs/index.mdx`**

In the frontmatter `hero:` block, add an `image:` key above `tagline:`:

```yaml
hero:
  image:
    file: ../../assets/retask-icon.svg
  tagline: Manage workspaces, projects, tasks, sandboxes, and agents — in the app or from your terminal.
```

- [ ] **Step 3: Build gate**

Run: `yarn build`
Expected: exits 0 (confirms the hero image import path resolves).

- [ ] **Step 4: Visual gate — homepage**

Run: `shot "" t5-home` then read the PNG.
Expected: the shuffle icon appears in the hero (right side on desktop); the "Get started" button is brand blue with rounded corners; cards have rounded corners.

- [ ] **Step 5: Visual gate — card hover is non-blocking**

(Hover state can't be screenshot easily; just confirm cards render with rounded corners and a visible border in `t5-home.png`.)

- [ ] **Step 6: Commit**

```bash
git add src/styles/brand.css src/content/docs/index.mdx
git commit -m "style: brand polish for buttons, cards, links, and hero icon"
```

---

### Task 6: Full verification pass (light + dark, build, scope check)

**Files:** none (verification only)

- [ ] **Step 1: Production build + existing tests**

Run: `yarn build && yarn test`
Expected: build exits 0; vitest (scripts/) passes — confirms nothing in the generation pipeline regressed.

- [ ] **Step 2: Confirm no generated/reference drift**

Run: `git diff --stat main -- src/content/docs/cli/reference/ scripts/`
Expected: **no output** (zero changes under reference pages or scripts).

- [ ] **Step 3: Light-mode review**

Run: `shot "" v-home-light 1440` and `shot guides/getting-started/ v-guide-light 1440`; read both.
Expected, against the brand: blue accent (no green anywhere), Plus Jakarta Sans, icon+"Retask"+muted "Docs" lockup, balanced headings, brand favicon, rounded blue button/cards.

- [ ] **Step 4: Dark-mode review**

In a real browser tab at `http://localhost:4321/`, click the theme toggle to "Dark" and review the homepage and a guide page. Confirm:
  - logo swaps to `logo-dark.svg` (light wordmark, the icon's arrows stay visible — not muddied by multiply),
  - links are the lighter blue `#9dbeff` and readable on the dark background,
  - no green, headings balanced.
If the dark-mode link contrast looks weak, bump `--sl-color-accent-high` (dark) toward `#b7d8ff` in `brand.css` and re-check (this is the one value flagged in the spec's risks).

- [ ] **Step 5: Final commit (only if Step 4 required a tweak)**

```bash
git add src/styles/brand.css
git commit -m "style: tune dark-mode link contrast"
```

---

## Self-review (against the spec)

- **Palette (spec §1):** Task 2 — accent vars both modes. ✓
- **Typography (spec §2):** Task 1 — dependency swap + `--sl-font`; Inter removed. ✓
- **Type scale (spec §3):** Task 3 — heading tokens at both breakpoints + weight/tracking + hero clamp. ✓
- **Logo + favicon (spec §4):** Task 4 — two lockups (with dark icon recolor + multiply removed), brand favicon, theme-color, `replacesTitle` with `title` kept for SEO. ✓
- **Light polish (spec §5):** Task 5 — buttons, cards, links, hero icon. ✓
- **Risks:** responsive heading tokens (Task 3 re-asserts at `50em`); dark-icon contrast (Task 4 dark variant); dark link contrast (Task 6 Step 4 tweak); no reference drift (Task 6 Step 2). ✓
- **Verification (spec):** `yarn build`, `yarn test`, light+dark screenshots, scope diff. ✓
- **Placeholder scan:** no TBD/TODO; every CSS/SVG/config block is complete. ✓
- **Type consistency:** `--retask-*` token names defined in Task 1 are used verbatim in Tasks 3 & 5; `retask-icon.svg` created in Task 4 is referenced by Task 5. ✓
