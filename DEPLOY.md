# Deploying retask-docs

Hosted on Cloudflare Pages, custom domain `docs.retask.work`.

## One-time Cloudflare Pages setup

1. Create a Pages project connected to the `nwebxyz/retask-docs` GitHub repo.
2. Build settings:
   - **Build command:**
     `curl -fsSL https://retask.work/install.sh | sh && export PATH="$HOME/.local/bin:/usr/local/bin:$PATH" && npm ci && npm run gen:cli && npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 20 (set `NODE_VERSION=20` env var if needed)
3. Add the custom domain `docs.retask.work` (CNAME to the Pages project) under the same
   Cloudflare account/zone used by the marketing site.

The build regenerates the CLI reference from the latest released CLI, so production always
reflects the shipped CLI even if committed pages lag.
