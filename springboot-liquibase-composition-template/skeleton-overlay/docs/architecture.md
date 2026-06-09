# Architecture

The application exposes HTTP endpoints through Spring Boot and uses JPA for persistence. Liquibase migrations are maintained alongside the service in the `db/` folder for coordinated releases.

```mermaid
flowchart LR
  A[Client] --> B[Spring Boot API]
  B --> C[JPA Layer]
  C --> D[(PostgreSQL / Oracle)]
  E[Liquibase changelogs in db/] --> D
  F[CI Pipeline] --> B
  F --> E
```

## Notes

- application code lives in `src/main/java`
- runtime config lives in `src/main/resources`
- deployment-ready SQL migrations live in `db/src/001_scripts`
