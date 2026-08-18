---
title: Comment
description: Comment commands for the Retask CLI.
---

<!-- AUTO-GENERATED from `retask help-llm`. Do not edit by hand; run `yarn gen:cli`. -->
## `retask comment list`

List comments on a task (all comments — top-level and replies — by default). Requires workspace context (--workspace-id or NWEB_WORKSPACE_ID). --task is the task ID (mapped to the task NRN). Pass --parent-comment-id to list only the replies under a specific comment. --created-by filters by author user NRN (repeatable, format: nweb:auth:user:<id>, obtainable from retask auth whoami user_nrn). --sort: default, created-asc, created-desc

**Flags:** `--task`, `--parent-comment-id`, `--sort`, `--created-by`

```bash
retask comment list --task <task-id>
```

## `retask comment get`

Get a comment by ID

```bash
retask comment get <comment-id>
```

## `retask comment create`

Create a comment on a task. Requires workspace context (--workspace-id or NWEB_WORKSPACE_ID). --body is stored verbatim as HTML (TipTap getHTML() format); mention a member by embedding <span data-type="mention" data-id="nweb:workspace:member:<uuid>">@Name</span> in the body (the server parses mentions from the body). --parent-comment-id replies to a top-level comment (replies are one level deep)

**Flags:** `--task`, `--body`, `--parent-comment-id`

```bash
retask comment create --task <task-id> --body '<p>Looks good</p>'
```

## `retask comment update`

Edit a comment's body (only the author can edit; sets is_edited). --body is HTML, same format and mention syntax as create

**Flags:** `--body`

```bash
retask comment update <comment-id> --body '<p>Edited</p>'
```

## `retask comment delete`

Delete a comment (soft-delete; deleting a top-level comment cascade-deletes its replies)

```bash
retask comment delete <comment-id>
```

## `retask comment attachment add`

Attach a file to a comment (file IDs come from retask file)

```bash
retask comment attachment add <comment-id> <file-id>
```

## `retask comment attachment remove`

Remove a file attachment from a comment

```bash
retask comment attachment remove <comment-id> <file-id>
```
