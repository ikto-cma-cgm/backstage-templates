# Spring Boot from OpenAPI Spec — Template

## Purpose

This Golden Path scaffolds a Spring Boot 3 service that **implements an existing OpenAPI specification** already registered in the Backstage Catalog (typically created via the `swagger-template`).

## What it generates

- **Spring Boot 3 service** with Maven build, Actuator, Swagger UI
- **H2 in-memory database** par défaut — aucune infrastructure requise pour démarrer
- **`openapi-generator-maven-plugin`** configuré pour fetcher la spec depuis le repo API existant au build time
- **Delegate implementations** (`HealthController`, `ResourcesController`, `ResourceService`) prêtes à implémenter
- **`catalog-info.yaml`** avec `providesApis: [<selected-api-entity>]` — crée le lien visible dans le Catalog graph
- **Full TechDocs** (4 pages : overview, architecture, API reference, operations runbook)

## Composition

| Step | Source | Description |
|---|---|---|
| `fetch-springboot-skeleton` | Remote — `ikto-cma-cgm/backstage-templates` | Spring Boot base (code, Dockerfile, pipeline) |
| `fetch-app-overlay` | Local — `skeleton-overlay/` | OpenAPI codegen config, delegates, docs |

## When to use

Use this template when:
1. An API spec already exists in the Catalog (created by `swagger-template`)
2. You want to scaffold the service that **implements** that contract
3. You want the Java code to be generated automatically from the spec at each `mvn generate-sources`

## Code generation workflow

```
API Spec Repo (swagger-template)          Service Repo (this template)
openapi.yaml                              pom.xml
    │                                         │
    │   fetched at mvn generate-sources       │
    └─────────────────────────────────────────►
                                          target/generated-sources/
                                          ├── ResourcesApiDelegate.java
                                          ├── ResourcesApiController.java
                                          └── model/*.java
                                                │
                                          src/main/java/
                                          └── ResourcesController.java  ← you edit this
```

## Catalog graph

```
[API entity]  ◄── providesApis ──  [Component]
swagger-template                   this service
kind: API                          kind: Component
```

## Parameters

| Group | Key parameters |
|---|---|
| Service identity | `name`, `description`, `owner` |
| Catalog placement | `system`, `domain` |
| OpenAPI Contract | `existingApiRef` (EntityPicker kind:API), `apiRepoOwner` |
| Build | `javaVersion`, `groupId`, `packageName`, `springBootVersion` |
| Repository | `repoProvider`, `repoOwner` |
