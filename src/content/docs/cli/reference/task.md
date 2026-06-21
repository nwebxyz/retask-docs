---
title: Task
description: Task commands for the Retask CLI.
---

<!-- AUTO-GENERATED from `retask help-llm`. Do not edit by hand; run `npm run gen:cli`. -->
## `retask task list`

List tasks. --assignee is repeatable and accepts workspace_member_nrns (format: nweb:workspace:member:<uuid>, obtainable from retask auth whoami or retask workspace member list)

**Flags:** `--project-id`, `--status`, `--assignee`, `--priority`

```bash
retask task list --assignee nweb:workspace:member:<uuid1> --assignee nweb:workspace:member:<uuid2>
```

## `retask task get`

Get a task by ID

```bash
retask task get <task-id>
```

## `retask task get-by-key`

Get a task by key (e.g. ENG-42)

```bash
retask task get-by-key ENG-42
```

## `retask task create`

Create a task

**Flags:** `--project-id`, `--title`, `--description`, `--status`, `--priority`, `--assignee`, `--due-at`

```bash
retask task create --project-id <id> --title 'Fix bug' --priority HIGH
```

## `retask task update`

Partial update a task (only set flags change)

**Flags:** `--title`, `--description`, `--status`, `--priority`, `--assignee`, `--due-at`

```bash
retask task update <id> --status <status-id> --priority HIGH
```

## `retask task delete`

Delete a task

```bash
retask task delete <task-id>
```

## `retask task attachment add`

Attach a file to a task

```bash
retask task attachment add <task-id> <file-id>
```

## `retask task attachment remove`

Remove a file attachment from a task

```bash
retask task attachment remove <task-id> <file-id>
```
