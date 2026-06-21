---
title: CLI core concepts
description: Profiles, transport, output format, and NRNs in the Retask CLI.
---

Document in this page:
- **Profiles** — multiple endpoints/workspaces in `~/.config/retask/config.yaml` (`RETASK_PROFILE`)
- **Transport** — gRPC by default; `NWEB_API_TRANSPORT=http` for Connect-over-HTTP (proxy auth in secure sandboxes)
- **Output** — JSON-first; `--pretty` for tables; pipe to `jq`
- **No-persist mode** — `--no-save` / `RETASK_NO_PERSIST` prints `export` lines instead of writing config
- **NRNs** — entity identifiers like `nweb:workspace:member:<uuid>` used by flags such as `--assignee`
