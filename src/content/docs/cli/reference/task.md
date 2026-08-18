---
title: Task
description: Task commands for the Retask CLI.
---

<!-- AUTO-GENERATED from `retask help-llm`. Do not edit by hand; run `yarn gen:cli`. -->
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

Create a task. Requires workspace context (--workspace-id or NWEB_WORKSPACE_ID). --description accepts simple HTML. --parent-task-id makes the task a subtask of that task. --assignee is repeatable and takes workspace_member_nrns (format: nweb:workspace:member:<uuid>); --reporter takes the same NRN format and defaults to the creator

**Flags:** `--project-id`, `--title`, `--description`, `--priority`, `--due-at`, `--parent-task-id`, `--assignee`, `--reporter`, `--estimation-points`

```bash
retask task create --project-id <id> --title 'Fix bug' --priority HIGH --parent-task-id <parent-task-id>
```

## `retask task update`

Partial update a task (only set flags change). --status takes a status ID and --task-type a task type ID, both of which must exist in the project's config. --assignee is repeatable and replaces all assignees (workspace_member_nrns, format: nweb:workspace:member:<uuid>); pass it empty to clear. --parent-task-id and --reporter accept an empty string to clear

**Flags:** `--title`, `--description`, `--priority`, `--status`, `--task-type`, `--assignee`, `--parent-task-id`, `--reporter`, `--estimation-points`, `--due-at`

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
