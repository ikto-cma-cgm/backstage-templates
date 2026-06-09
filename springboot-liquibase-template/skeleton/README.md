# ${{ values.name }}

Standalone Liquibase project for CMA CGM database migrations.

## Description

This repository packages Liquibase changelogs, SQL scripts and XL Deploy metadata to deliver schema evolutions for the `${{ values.system }}` system.

## Prerequisites

- Liquibase CLI 4.x
- Access to the target `${{ values.dbType }}` database
- XL Deploy packaging and deployment permissions
- Java runtime if Liquibase CLI is installed locally

## Directory structure

```text
.
├── catalog-info.yaml
├── deployit-manifest.xml
├── pipeline.yml
├── mkdocs.yml
├── docs/
└── src/
    └── 001_scripts/
        ├── db-changelog.xml
        ├── 001_scripts.xml
        └── 001_scripts.sql
```

## Adding a new migration

1. Create a new SQL file in `src/001_scripts/`.
2. Add a new `changeSet` or include file in `src/001_scripts/db-changelog.xml` or the referenced XML changelog.
3. Keep identifiers unique and rollback-friendly.
4. Test locally with Liquibase before pushing.

## Environment variables

| Variable | Description |
|---|---|
| `DB_URL` | JDBC URL of the target database |
| `DB_USER` | Database user with migration permissions |
| `DB_PASSWORD` | Password for the database user |
| `DB_SCHEMA` | Default schema targeted by Liquibase |

## Local run with Liquibase CLI

```bash
liquibase           --url="$DB_URL"           --username="$DB_USER"           --password="$DB_PASSWORD"           --default-schema-name="$DB_SCHEMA"           --changeLogFile=src/001_scripts/db-changelog.xml           update
```

## Pipeline stages

- package ZIP artifact for XL Deploy
- publish deployment package metadata
- trigger environment-specific deployment flow

## Contact

Owner: `${{ values.owner }}`
