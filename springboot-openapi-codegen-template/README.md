# Spring Boot Service from OpenAPI Spec

Scaffolds a Spring Boot 3 service whose API interfaces, models and controllers are **auto-generated from an existing OpenAPI spec** registered in the Backstage Catalog.

## Purpose

Use this template when a swagger contract already exists (created via the `swagger-template`) and you want to spin up the Java service that implements it.

### What gets generated

```
<service-name>/
├── pom.xml                          # Maven build with openapi-generator + exec-maven-plugin
├── scripts/generate-stubs.sh        # Stub generator (run automatically by mvn install)
├── Dockerfile
├── src/main/resources/
│   ├── api/openapi.yaml             # Spec downloaded from the API entity's repository
│   └── application.yml
└── src/main/java/<package>/
    ├── Application.java
    ├── api/                         # Generated on every mvn install (do not edit)
    │   ├── <Tag>Api.java            #   Route interface
    │   ├── <Tag>ApiController.java  #   @RestController
    │   ├── <Tag>ApiDelegate.java    #   Delegate interface to implement
    │   └── model/                   #   Request/response POJOs
    ├── controller/
    │   └── <Tag>Controller.java     # @Override stubs — edit here
    └── service/
        └── <Tag>Service.java        # Business logic stubs — edit here
```

### Build behaviour

| Maven phase | What happens |
|---|---|
| `generate-sources` | openapi-generator reads `openapi.yaml` → writes `api/` and `api/model/` into `src/main/java` |
| `process-sources` | `generate-stubs.sh` reads `*ApiDelegate.java` → creates `controller/` and `service/` stubs (skips existing files) |
| `compile` | Everything compiled together |

> Regenerating: `mvn generate-sources` rewrites the `api/` package on every build. Never edit files under `api/` — your changes will be lost. Edit only `controller/` and `service/`.

## Usage

1. In Backstage, navigate to **Create → Spring Boot Service from OpenAPI Spec**
2. Select the existing OpenAPI entity (`swagger-template` output) from the Catalog picker
3. Fill in service identity, package name, Java version
4. After scaffolding: `git clone <repo> && mvn install`
5. Implement business logic in `<Tag>Service.java`
6. Wire the service in `<Tag>Controller.java`
7. `mvn spring-boot:run`

## Parameters

| Parameter | Description | Default |
|---|---|---|
| `name` | Kebab-case service name | — |
| `packageName` | Root Java package | `com.example.service` |
| `javaVersion` | `17` or `21` | `21` |
| `groupId` | Maven group ID | `com.cma` |
| `springBootVersion` | Spring Boot version | `3.4.2` |
| `existingApiRef` | Catalog API entity to implement | — |

## Composition

This template is a **composition** of two skeletons applied in order:

1. `springboot-template/skeleton` — base Maven/Spring Boot structure
2. `./skeleton-overlay` — openapi-generator config, `generate-stubs.sh`, `Application.java`

The overlay uses `replace: true` and removes placeholder files (`HealthController`, `Example`, `ExampleService`) via `fs:delete` steps.

## Ownership

- **Owner**: `group:default/it-development-software-engineering-developer-platform`
- **Support**: open an issue on the repository or reach out to the Developer Portal Team.
