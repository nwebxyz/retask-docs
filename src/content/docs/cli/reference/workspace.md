---
title: Workspace
description: Workspace commands for the Retask CLI.
---

<!-- AUTO-GENERATED from `retask help-llm`. Do not edit by hand; run `yarn gen:cli`. -->
## `retask workspace list`

List workspaces accessible to the user

```bash
retask workspace list
```

## `retask workspace get`

Get a workspace by ID

```bash
retask workspace get <workspace-id>
```

## `retask workspace create`

Create a workspace

**Flags:** `--name`, `--description`, `--color`

```bash
retask workspace create --name 'My Team'
```

## `retask workspace update`

Update workspace fields

**Flags:** `--name`, `--description`, `--color`

```bash
retask workspace update <id> --name 'New Name'
```

## `retask workspace delete`

Delete a workspace

```bash
retask workspace delete <workspace-id>
```

## `retask workspace member list`

List workspace members

```bash
retask workspace member list <workspace-id>
```

## `retask workspace member invite`

Invite a member by email

**Flags:** `--email`, `--role`, `--display-name`

```bash
retask workspace member invite <ws-id> --email user@example.com --role EDITOR
```

## `retask workspace member update`

Update member role or display name

**Flags:** `--role`, `--display-name`

```bash
retask workspace member update <ws-id> <member-id> --role ADMIN
```

## `retask workspace member remove`

Remove a member from workspace

```bash
retask workspace member remove <ws-id> <member-id>
```
