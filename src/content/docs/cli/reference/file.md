---
title: File
description: File commands for the Retask CLI.
---

<!-- AUTO-GENERATED from `retask help-llm`. Do not edit by hand; run `npm run gen:cli`. -->
## `retask file list`

List files

**Flags:** `--project-id`

```bash
retask file list --project-id <proj-id>
```

## `retask file get`

Get a file by ID

```bash
retask file get <file-id>
```

## `retask file delete`

Delete a file

```bash
retask file delete <file-id>
```

## `retask file signed-url`

Get a signed download URL

**Flags:** `--expires-in`

```bash
retask file signed-url <file-id> --expires-in 1h
```
