---
title: Sandbox
description: Sandbox commands for the Retask CLI.
---

<!-- AUTO-GENERATED from `retask help-llm`. Do not edit by hand; run `yarn gen:cli`. -->
## `retask sandbox list`

List sandboxes

**Flags:** `--status`, `--type`

```bash
retask sandbox list --type PRIVATE
```

## `retask sandbox get`

Get a sandbox by ID

```bash
retask sandbox get <sandbox-id>
```

## `retask sandbox create`

Create a sandbox. Custom config via --env/--git-repo/--startup-command/--session-init-command/--shutdown-policy/--integration-provider-id, all mutually exclusive with --template-id

**Flags:** `--name`, `--type`, `--template-id`, `--env`, `--git-repo`, `--startup-command`, `--session-init-command`, `--shutdown-policy`, `--integration-provider-id`

```bash
retask sandbox create --name my-sandbox --session-init-command 'claude --dangerously-skip-permissions "$SEED_PROMPT"'
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

**Flags:** `--sandbox-id`, `--status`

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

**Flags:** `--sandbox-id`, `--name`

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

**Flags:** `--mode`, `--auto-open`, `--no-auto-respond`

```bash
retask sandbox connect <sandbox-id>
```

## `retask sandbox attach`

Attach terminal to a running local session

```bash
retask sandbox attach <session-id>
```
