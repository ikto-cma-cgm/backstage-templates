# Operations

## Applying migrations

```bash
liquibase           --url="$DB_URL"           --username="$DB_USER"           --password="$DB_PASSWORD"           --default-schema-name="$DB_SCHEMA"           --changeLogFile=src/001_scripts/db-changelog.xml           update
```

## Rollback

```bash
liquibase           --url="$DB_URL"           --username="$DB_USER"           --password="$DB_PASSWORD"           --changeLogFile=src/001_scripts/db-changelog.xml           rollbackCount 1
```

## Status check

```bash
liquibase           --url="$DB_URL"           --username="$DB_USER"           --password="$DB_PASSWORD"           --changeLogFile=src/001_scripts/db-changelog.xml           status
```

## Troubleshooting

- Validate XML syntax before packaging.
- Check DB credentials and schema permissions.
- Ensure `${{ values.dbType }}` matches the target platform.
- Review XL Deploy logs if the package is uploaded but not executed.

## Environment variables

`DB_URL`, `DB_USER`, `DB_PASSWORD` and `DB_SCHEMA` must be set in local shells or CI secrets.

## Pipeline stages

The pipeline packages the repository as ZIP, skips tests and Sonar, and prepares the artifact for XL Deploy-driven promotion.
