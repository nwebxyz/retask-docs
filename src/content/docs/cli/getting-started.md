---
title: CLI getting started
description: Install the Retask CLI, authenticate with a PAT, and run your first command.
---

The Retask CLI (`retask`) drives the same API as the web app from your terminal or scripts.

## Install

macOS / Linux:

```bash
curl -fsSL https://retask.work/install.sh | sh
```

Windows (PowerShell):

```powershell
irm https://retask.work/install.ps1 | iex
```

Check the installed version at any time with:

```bash
retask -v
```

To update to the latest release, run `retask upgrade`, then `retask -v` again to
confirm the new version.

## Authenticate

There are two ways to authenticate. Pick whichever fits.

### With a Personal Access Token

Set your Personal Access Token and workspace, then exchange the PAT for a token:

```bash
export NWEB_API_KEY="nweb_pat_..."
export NWEB_WORKSPACE_ID="00000000-0000-0000-0000-000000000000"  # workspace UUID
retask auth login
```

### With an existing token

If you already have a token, set `NWEB_API_TOKEN` and you're ready to go — the
token already identifies your workspace, so you do **not** need `NWEB_API_KEY` or
`NWEB_WORKSPACE_ID`, and you can skip `retask auth login`:

```bash
export NWEB_API_TOKEN="..."
```

Other optional environment variables: `NWEB_API_ENDPOINT`, `RETASK_PROFILE`,
`RETASK_NO_PERSIST`.

## First commands

```bash
retask project list
retask task create --project-id <id> --title "Fix login bug" --priority HIGH
```

See the [command reference](/cli/reference/auth/) for every command.
