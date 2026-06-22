---
title: Agent
description: Agent commands for the Retask CLI.
---

<!-- AUTO-GENERATED from `retask help-llm`. Do not edit by hand; run `yarn gen:cli`. -->
## `retask agent list`

List agents

**Flags:** `--role`

```bash
retask agent list --role ROLE_TASK_PROCESSOR
```

## `retask agent get`

Get an agent by ID

```bash
retask agent get <agent-id>
```

## `retask agent create`

Create an agent

**Flags:** `--name`, `--role`, `--description`, `--sandbox-template-id`

```bash
retask agent create --name 'Task Bot' --role ROLE_TASK_PROCESSOR
```

## `retask agent update`

Update an agent

**Flags:** `--name`, `--role`, `--description`, `--sandbox-template-id`

```bash
retask agent update <id> --name 'New Name'
```

## `retask agent delete`

Delete an agent

```bash
retask agent delete <agent-id>
```
