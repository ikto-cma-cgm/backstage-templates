# Spring Boot Liquibase Migration Template

Scaffolds a **standalone Liquibase database migration project** with CI pipeline and Backstage integration.

## Purpose

Use this template to create a dedicated repository for database schema migrations. It is typically used alongside a Spring Boot service repository — the migrations live in a separate repo and are applied independently by the CI pipeline.

### What gets generated

```
<migrations-name>/
├── src/
│   └── 001_scripts/
│       ├── db-changelog.xml    # Liquibase master changelog
│       ├── 001_scripts.xml     # Changeset definitions
│       └── 001_scripts.sql     # SQL migration scripts
├── pipeline.yml                # CI pipeline for running migrations
├── deployit-manifest.xml       # XL Deploy manifest
├── catalog-info.yaml           # Backstage Component entity
└── docs/
    ├── index.md
    ├── architecture.md
    └── operations.md
```

## Usage

1. In Backstage, navigate to **Create → Spring Boot Liquibase Migrations**
2. Fill in project name, owner, system and repository destination
3. After scaffolding: add your SQL migrations under `src/001_scripts/`
4. The CI pipeline (`pipeline.yml`) applies migrations on push

## Naming convention

Migration files follow the `NNN_description` pattern:
- `001_scripts/` — initial schema
- Add `002_scripts/`, `003_scripts/` etc. for subsequent migrations

## Parameters

| Parameter | Description | Default |
|---|---|---|
| `name` | Kebab-case project name | — |
| `description` | Short description | — |
| `owner` | Owning team (Backstage Group) | — |
| `system` | Backstage System | — |
| `domain` | Business domain | — |
| `repoProvider` | `github` or `gitlab` | `github` |
| `repoOwner` | Organisation / namespace | `ikto-cma-cgm` |

## Ownership

- **Owner**: `group:default/it-development-software-engineering-developer-platform`
- **Support**: open an issue on the repository or reach out to the Developer Portal Team.
