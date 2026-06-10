# Spring Boot API Bundle Template

Scaffolds a **Spring Boot 3 REST service** with an embedded **OpenAPI 3.0 spec** in a single repository.

## What it generates

One repo containing:
- A complete Spring Boot service (`src/main/java/`)
- An OpenAPI spec (`src/main/resources/api/openapi.yaml`) — a working CRUD skeleton to customise
- Two Backstage Catalog entities: `Component` (the service) + `API` (the spec)

## Developer workflow

```bash
git clone <repo>
make init   # generates Java sources from spec, inlines them, compiles
make run    # starts on http://localhost:8080
```

## Template parameters

| Group | Key parameters |
|---|---|
| Service identity | name, description, owner |
| Catalog placement | system, domain |
| Java config | javaVersion (17/21), packageName, groupId, springBootVersion |
| Repository | repoProvider (github/gitlab), repoOwner |
