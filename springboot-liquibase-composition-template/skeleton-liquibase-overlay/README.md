# Database migrations

This directory contains Liquibase changelogs and SQL files for `${{ values.name }}`.

## Structure

- `deployit-manifest.xml` packages migrations for XL Deploy
- `pipeline.yml` defines the ZIP packaging pipeline
- `src/001_scripts/` contains XML changelogs and SQL files

## Adding migrations

1. Add a SQL file under `src/001_scripts/`.
2. Reference it from the XML changelog.
3. Validate with Liquibase CLI.

## Local execution

```bash
liquibase           --url="$DB_URL"           --username="$DB_USER"           --password="$DB_PASSWORD"           --changeLogFile=src/001_scripts/db-changelog.xml           update
```

## Environment variables

- `DB_URL`
- `DB_USER`
- `DB_PASSWORD`
- `DB_SCHEMA`
