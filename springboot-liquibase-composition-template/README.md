# Spring Boot + Liquibase Composition Template

Scaffolds a **Spring Boot 3 microservice with embedded Liquibase database migrations** in a single repository, plus a companion Liquibase-only repository for the migration scripts.

## Purpose

Use this template when you need a Spring Boot service with a managed relational database schema. It combines the `springboot-template` base with a Liquibase overlay and creates two repositories:

1. **Application repo** — Spring Boot service with Liquibase runtime integration
2. **Migrations repo** — standalone Liquibase scripts managed separately

### What gets generated

**Application repository** (`skeleton-overlay`):
```
<service-name>/
├── pom.xml                          # Spring Boot + Liquibase dependencies
├── pipeline.yml
├── src/main/java/<package>/
│   ├── Application.java
│   ├── controller/
│   │   ├── ExampleController.java   # Example REST endpoint
│   │   └── HealthController.java
│   ├── model/Example.java
│   ├── service/ExampleService.java
│   └── ...
└── src/main/resources/
    ├── api/openapi.yaml             # API contract stub
    └── application.yml              # Datasource + Liquibase config
```

**Migrations repository** (`skeleton-liquibase-overlay`):
```
<service-name>-liquibase/
├── src/001_scripts/
│   ├── db-changelog.xml
│   └── 001_scripts.sql
└── catalog-info.yaml
```

## Composition

This template applies three skeletons in sequence:

1. `springboot-template/skeleton` — base Maven/Spring Boot structure
2. `./skeleton-overlay` — Liquibase dependencies in `pom.xml`, example code
3. `./skeleton-liquibase-overlay` — standalone migrations repository

## Usage

1. In Backstage, navigate to **Create → Spring Boot + Liquibase Service**
2. Fill in service identity, database config, Java version and repository destination
3. After scaffolding:

```bash
# Application
git clone <app-repo> && mvn install && mvn spring-boot:run

# Migrations (applied by CI or manually)
git clone <migrations-repo>
```

## Parameters

| Parameter | Description | Default |
|---|---|---|
| `name` | Kebab-case service name | — |
| `packageName` | Root Java package | `com.example.service` |
| `javaVersion` | `17` or `21` | `21` |
| `groupId` | Maven group ID | `com.cma` |
| `springBootVersion` | Spring Boot version | `3.4.2` |
| `repoProvider` | `github` or `gitlab` | `github` |
| `repoOwner` | Organisation / namespace | `ikto-cma-cgm` |

## Ownership

- **Owner**: `group:default/it-development-software-engineering-developer-platform`
- **Support**: open an issue on the repository or reach out to the Developer Portal Team.
