---
title: Auth
description: Auth commands for the Retask CLI.
---

<!-- AUTO-GENERATED from `retask help-llm`. Do not edit by hand; run `npm run gen:cli`. -->
## `retask auth login`

Exchange PAT for JWT, save to profile

```bash
retask auth login
```

## `retask auth logout`

Clear cached JWT from active profile

```bash
retask auth logout
```

## `retask auth whoami`

Print identity and workspace membership for the active token. Output: user_nrn, workspace_id, jwt_expires, endpoint, workspace_member.{nrn, role, membership_status, display_name, name, email, joined_at}

```bash
retask auth whoami
```

## `retask auth pat list`

List PATs for current user

```bash
retask auth pat list
```

## `retask auth pat create`

Create a new PAT

**Flags:** `--name`, `--description`, `--expires-at`

```bash
retask auth pat create --name ci-bot
```

## `retask auth pat revoke`

Revoke a PAT by ID

```bash
retask auth pat revoke <pat-id>
```
