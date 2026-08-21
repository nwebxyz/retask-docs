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

Create a sandbox. --sharing sets who can use it (WORKSPACE_EDIT, WORKSPACE_VIEW, PRIVATE; default PRIVATE) — agents can only run on a WORKSPACE_* sandbox. Custom config via --env/--git-repo/--startup-command/--session-init-command/--shutdown-policy/--integration-provider-id, all mutually exclusive with --template-id

**Flags:** `--name`, `--type`, `--sharing`, `--template-id`, `--env`, `--git-repo`, `--startup-command`, `--session-init-command`, `--shutdown-policy`, `--integration-provider-id`

```bash
retask sandbox create --name my-sandbox --session-init-command 'claude --dangerously-skip-permissions "$SEED_PROMPT"'
```

## `retask sandbox update`

Update a sandbox. --sharing changes who can use it: WORKSPACE_EDIT, WORKSPACE_VIEW, PRIVATE

**Flags:** `--name`, `--sharing`

```bash
retask sandbox update <id> --sharing WORKSPACE_EDIT
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

Connect this machine as a Private VM sandbox (long-running). Logs go to the TUI (stderr when headless) and to retask.log in the current folder, which rotates into retask.log.1 ... retask.log.N. Session folders are created in the current directory and recorded in sandbox_<sandbox-id>.json. Stopping a session, the sandbox, or this command leaves folders on disk; --retention deletes those older than its window (checked hourly), and "off" disables it. Live sessions are never deleted

**Flags:** `--mode`, `--auto-open`, `--no-auto-respond`, `--retention`, `--session-buffer`, `--log-file`, `--no-log-file`, `--log-max-size`, `--log-backups`, `--no-log-path`

```bash
retask sandbox connect <sandbox-id> --retention 30d
```

## `retask sandbox attach`

Attach terminal to a running local session

```bash
retask sandbox attach <session-id>
```

## `retask sandbox cleanup`

Delete session folders left behind by stopped sessions, in the current directory. Only folders recorded in a sandbox_<sandbox-id>.json session log are considered; anything else is left alone. With no argument every session log in the directory is swept; pass a sandbox id to narrow it. --older-than 0 deletes everything and prompts first unless --yes

**Flags:** `--older-than`, `--dry-run`, `--yes`

```bash
retask sandbox cleanup --older-than 7d
```
