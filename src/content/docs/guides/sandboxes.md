---
title: Sandboxes
description: Run agent workloads in Cloud sandboxes or connect your own Private VM.
---

A **sandbox** is an isolated environment where Retask agents run. Retask supports **Cloud** sandboxes (managed for you) and **Private VM** sandboxes (your own machine).

## Cloud sandboxes

Created and managed inside Retask. Choose a template and the platform provisions the environment.

## Private VM

A Private VM is your own machine connected to Retask. You connect it using the Retask CLI:

```bash
retask sandbox connect <sandbox-id> --mode headless
```

See the [CLI getting started guide](/cli/getting-started/) to install the CLI and authenticate first.

Document in this page:
- Creating a Cloud sandbox (type, template)
- Connecting a Private VM end to end
- Stopping and deleting sandboxes
