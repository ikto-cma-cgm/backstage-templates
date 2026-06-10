# ${{ values.name }}

${{ values.description }}

This service implements the OpenAPI contract **${{ values.apiName }}** and was scaffolded from the [Spring Boot from OpenAPI Spec](https://github.com/ikto-cma-cgm/backstage-templates/tree/main/springboot-openapi-codegen-template) Golden Path.

## Prerequisites

- Java ${{ values.javaVersion }}
- Maven 3.9+
- PostgreSQL (or Docker for local dev)
- Network access to the OpenAPI spec repository (`${{ values.apiRepoOwner }}/${{ values.apiName }}`)

## Getting Started

### 1. Generate API stubs

```bash
mvn generate-sources
```

This fetches the OpenAPI spec from:

```
{%- if values.repoProvider == 'github' %}
https://raw.githubusercontent.com/${{ values.apiRepoOwner }}/${{ values.apiName }}/main/openapi.yaml
{%- else %}
https://${{ values.gitlabHost }}/${{ values.apiRepoOwner }}/${{ values.apiName }}/-/raw/main/openapi.yaml
{%- endif %}
```

And generates the following into `target/generated-sources/openapi/`:
- `${{ values.packageName }}.api.HealthApi` — interface for health endpoints
- `${{ values.packageName }}.api.ResourcesApi` — interface for resource endpoints
- `${{ values.packageName }}.api.HealthApiDelegate` — delegate interface (implement this)
- `${{ values.packageName }}.api.ResourcesApiDelegate` — delegate interface (implement this)
- `${{ values.packageName }}.api.model.*` — model classes (`Resource`, `ResourceRequest`, `ResourcePage`, `HealthResponse`)

### 2. Implement your business logic

The generated controllers (`HealthApiController`, `ResourcesApiController`) delegate to implementations in your source code:

| Delegate | Your implementation | Purpose |
|---|---|---|
| `HealthApiDelegate` | `HealthController` | Returns service health status |
| `ResourcesApiDelegate` | `ResourcesController` | CRUD on resources |

Edit `src/main/java/${{ values.packagePath }}/controller/ResourcesController.java` and `src/main/java/${{ values.packagePath }}/service/ResourceService.java`.

### 3. Run locally

```bash
# With local profile (H2 in-memory DB)
mvn spring-boot:run -Plocal

# Build Docker image
docker build -t ${{ values.name }}:local docker/

# Run with Docker Compose
docker run -p 8080:8080 ${{ values.name }}:local
```

## Environment Variables

| Variable | Required | Default | Description |
|---|:---:|---|---|
| `SPRING_DATASOURCE_URL` | ✅ | — | JDBC URL for PostgreSQL |
| `SPRING_DATASOURCE_USERNAME` | ✅ | — | Database username |
| `SPRING_DATASOURCE_PASSWORD` | ✅ | — | Database password |
| `PORT` | ❌ | `8080` | HTTP server port |
| `LOG_LEVEL` | ❌ | `INFO` | Log level (DEBUG, INFO, WARN, ERROR) |

## API Endpoints

Endpoints are defined by the contract **${{ values.apiName }}**. After running `mvn generate-sources`, Swagger UI is available at:

```
http://localhost:8080/swagger-ui.html
```

## Architecture

```
HTTP Request
    │
    ▼
ResourcesApiController  ← generated (target/)
    │ delegates to
    ▼
ResourcesController     ← your code (src/)
    │
    ▼
ResourceService         ← business logic
    │
    ▼
PostgreSQL (via JPA)
```

## When the spec changes

```bash
mvn generate-sources
```

The plugin fetches the latest `openapi.yaml` from the **${{ values.apiName }}** repository. If the spec changed, update your delegate implementations accordingly.

## Catalog

This service is visible in the Backstage Catalog as a **Component** and is linked to the **${{ values.existingApiRef }}** API entity via `providesApis`.

- Component: [${{ values.name }}](https://${{ values.repoProvider }}.com/${{ values.repoOwner }}/${{ values.name }})
- Provides API: ${{ values.existingApiRef }}

## Owner

Team: **${{ values.owner }}** — System: **${{ values.system }}** — Domain: **${{ values.domain }}**
