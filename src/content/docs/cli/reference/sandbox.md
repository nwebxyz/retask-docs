---
title: Sandbox
description: Sandbox commands for the Retask CLI.
---

<!-- AUTO-GENERATED from `retask help-llm`. Do not edit by hand; run `npm run gen:cli`. -->
## `retask sandbox list`

List sandboxes

```bash
retask sandbox list
```

## `retask sandbox get`

Get a sandbox by ID

```bash
retask sandbox get <sandbox-id>
```

## `retask sandbox create`

Create a sandbox

**Flags:** `--name`, `--type`, `--template-id`, `--workspace-id`

```bash
retask sandbox create --name my-sandbox --type CLOUD
```

## `retask sandbox update`

Update a sandbox

**Flags:** `--name`

```bash
retask sandbox update <id> --name new-name
```

## `retask sandbox stop`

Stop a running sandbox

```bash
retask sandbox stop <sandbox-id>
```

## `retask sandbox delete`

Delete a sandbox

```bash
retask sandbox delete <sandbox-id>
```

## `retask sandbox session list`

List sessions

**Flags:** `--sandbox-id`

```bash
retask sandbox session list --sandbox-id <sb-id>
```

## `retask sandbox session get`

Get a session by ID

```bash
retask sandbox session get <session-id>
```

## `retask sandbox session create`

Create a sandbox session

**Flags:** `--sandbox-id`

```bash
retask sandbox session create --sandbox-id <sb-id>
```

## `retask sandbox session update`

Partial update a session

**Flags:** `--name`, `--seed-nrn`, `--seed-prompt`

```bash
retask sandbox session update <id> --name "My Session"
```

## `retask sandbox session stop`

Stop a session

```bash
retask sandbox session stop <session-id>
```

## `retask sandbox session delete`

Delete a session

```bash
retask sandbox session delete <session-id>
```

## `retask sandbox connect`

Connect this machine as a Private VM sandbox (long-running)

**Flags:** `--mode`

```bash
retask sandbox connect <sandbox-id> --mode headless
```
