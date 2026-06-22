---
title: Integration
description: Integration commands for the Retask CLI.
---

<!-- AUTO-GENERATED from `retask help-llm`. Do not edit by hand; run `yarn gen:cli`. -->
## `retask integration provider list`

List integration providers

```bash
retask integration provider list
```

## `retask integration provider get`

Get a provider by ID

```bash
retask integration provider get <provider-id>
```

## `retask integration list`

List integrations

**Flags:** `--provider-id`

```bash
retask integration list --provider-id github
```

## `retask integration get`

Get an integration by ID

```bash
retask integration get <integration-id>
```

## `retask integration set`

Create or update an integration

**Flags:** `--provider-id`, `--level`, `--access-token`

```bash
retask integration set --provider-id github --access-token ghp_xxx
```

## `retask integration delete`

Delete an integration

```bash
retask integration delete <integration-id>
```

## `retask integration github repos`

List GitHub repos accessible via integration

**Flags:** `--level`

```bash
retask integration github repos
```
