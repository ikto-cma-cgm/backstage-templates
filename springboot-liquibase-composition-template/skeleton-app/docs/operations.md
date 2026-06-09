# Operations

## Health checks

Use `/actuator/health` for liveness and `/actuator/ready` for readiness checks.

## Start and stop

```bash
mvn spring-boot:run -Plocal
```

Stop the process with `Ctrl+C` or your orchestrator stop command.

## Environment variables

- `PORT`
- `DB_URL`
- `DB_USER`
- `DB_PASSWORD`
- `LOG_LEVEL`

## Logs and metrics

Logs are emitted to stdout through Logback. Metrics are available on `/actuator/metrics` and `/actuator/prometheus`.

## Liquibase migration status

Check migration state with:

```bash
liquibase           --url="$DB_URL"           --username="$DB_USER"           --password="$DB_PASSWORD"           --changeLogFile=db/src/001_scripts/db-changelog.xml           status
```
