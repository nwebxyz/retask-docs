---
title: Project
description: Project commands for the Retask CLI.
---

<!-- AUTO-GENERATED from `retask help-llm`. Do not edit by hand; run `npm run gen:cli`. -->
## `retask project list`

List projects in workspace

**Flags:** `--archived`

```bash
retask project list
```

## `retask project get`

Get a project by ID

```bash
retask project get <project-id>
```

## `retask project create`

Create a project

**Flags:** `--name`, `--description`, `--visibility`, `--color`, `--icon`

```bash
retask project create --name Backend --visibility VISIBILITY_WORKSPACE_EDIT
```

## `retask project update`

Update project fields

**Flags:** `--name`, `--description`, `--visibility`, `--color`, `--icon`

```bash
retask project update <id> --name 'New Name'
```

## `retask project archive`

Archive a project

```bash
retask project archive <project-id>
```

## `retask project unarchive`

Unarchive a project

```bash
retask project unarchive <project-id>
```

## `retask project delete`

Delete a project

```bash
retask project delete <project-id>
```

## `retask project member list`

List project members

```bash
retask project member list <project-id>
```

## `retask project member add`

Add a workspace member to a project

**Flags:** `--member-id`, `--role`

```bash
retask project member add <proj-id> --member-id <mem-id> --role MEMBER_ROLE_EDITOR
```

## `retask project member remove`

Remove a member from a project

```bash
retask project member remove <proj-id> <member-id>
```
