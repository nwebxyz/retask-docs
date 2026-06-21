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

## Authenticate

Set your Personal Access Token and workspace, then exchange the PAT for a JWT:
```bash
export NWEB_API_KEY="nweb_pat_..."
export NWEB_WORKSPACE_ID="ws_..."
retask auth login
```

`NWEB_API_KEY` and `NWEB_WORKSPACE_ID` are required. Optional environment variables:
`NWEB_API_TOKEN`, `NWEB_API_ENDPOINT`, `RETASK_PROFILE`, `RETASK_NO_PERSIST`.

## First commands

```bash
retask project list
retask task create --project-id <id> --title "Fix login bug" --priority HIGH
```

See the [command reference](/cli/reference/auth/) for every command.
