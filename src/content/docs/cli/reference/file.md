---
title: File
description: File commands for the Retask CLI.
---

<!-- AUTO-GENERATED from `retask help-llm`. Do not edit by hand; run `yarn gen:cli`. -->
## `retask file upload`

Upload a file — personal by default, or attached to a task or comment

**Flags:** `--task`, `--comment`

```bash
retask file upload ./report.pdf --task <task-id>
```

## `retask file list`

List files in the workspace, optionally filtered by attached resource or author

**Flags:** `--target`, `--created-by`

```bash
retask file list --target nweb:retask-task:task:<task-id>
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
