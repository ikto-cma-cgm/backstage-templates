# ${{ values.name }}

Spring Boot microservice with bundled Liquibase migrations stored in `db/`.

## Description

This repository contains the runtime application and the database migration assets required to evolve the schema in sync with the service.

## Prerequisites

- Java `${{ values.javaVersion }}` and Maven 3.9+
- Docker for container packaging
- Access to the target `${{ values.dbType }}` database
- Liquibase CLI if you want to run migrations locally from `db/`

## Project structure

```text
.
├── catalog-info.yaml
├── pipeline.yml
├── pom.xml
├── docker/
├── src/
└── db/
    ├── deployit-manifest.xml
    ├── pipeline.yml
    └── src/001_scripts/
```

## Local setup

```bash
mvn clean install
mvn spring-boot:run -Plocal
```

## Running migrations locally

```bash
liquibase           --url="$DB_URL"           --username="$DB_USER"           --password="$DB_PASSWORD"           --changeLogFile=db/src/001_scripts/db-changelog.xml           update
```

## Environment variables

| Variable | Description |
|---|---|
| `PORT` | Application HTTP port |
| `DB_URL` | JDBC URL for the database |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `LOG_LEVEL` | Root log level |

## Endpoints

- `/actuator/health`
- `/actuator/ready`

## Testing

Run `mvn test` before pushing changes.

## Contact

Owner: `${{ values.owner }}`
