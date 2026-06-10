# ${{ values.name }}

${{ values.description }}

This service implements the OpenAPI contract **${{ values.apiName }}** and was scaffolded from the [Spring Boot from OpenAPI Spec](https://github.com/ikto-cma-cgm/backstage-templates/tree/main/springboot-openapi-codegen-template) Golden Path.

## Prerequisites

- Java ${{ values.javaVersion }}
- Maven 3.9+

## Getting Started

### 1. Generate stubs from the spec

```bash
chmod +x scripts/generate-stubs.sh
./scripts/generate-stubs.sh
```

This script runs `mvn generate-sources` then creates a controller stub for each tag in your OpenAPI spec:

```
src/main/java/${{ values.packagePath }}/controller/
└── <Tag>Controller.java    ← generated stub, implements <Tag>ApiDelegate
```

The API interfaces and models land in `target/generated-sources/openapi/`:

```
${{ values.packageName }}.api.
├── <Tag>Api.java              ← interface
├── <Tag>ApiDelegate.java      ← implemented by your controller stub
├── <Tag>ApiController.java    ← generated controller (do not edit)
└── model/
    └── <Schema>.java
```

### 2. Implement your business logic

Edit the generated stub(s) in `src/main/java/${{ values.packagePath }}/controller/` and add your logic:

```java
@Component
@RequiredArgsConstructor
public class BookingsController implements BookingsApiDelegate {

    @Override
    public ResponseEntity<BookingList> listBookings(...) {
        // your business logic here
    }
}
```

### 3. Run locally

```bash
mvn spring-boot:run
```

The service starts on port **8080** with an H2 in-memory database.  
H2 console available at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:${{ values.name }}`).

## Build

```bash
mvn clean package -DskipTests
docker build -t ${{ values.name }}:local .
docker run -p 8080:8080 ${{ values.name }}:local
```

## API Endpoints

Endpoints are defined by the contract **${{ values.apiName }}**. After running `mvn generate-sources`, Swagger UI is available at:

```
http://localhost:8080/swagger-ui.html
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `8080` | HTTP server port |
| `LOG_LEVEL` | `INFO` | Log level (`DEBUG`, `INFO`, `WARN`, `ERROR`) |

> No database environment variables are required by default. The service uses an **H2 in-memory database** out of the box. To plug in a real database, override `spring.datasource.*` via environment variables or a dedicated Spring profile.

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
H2 in-memory (default) / external DB via Spring profile
```

## When the spec changes

```bash
mvn generate-sources
```

The plugin re-fetches `openapi.yaml` from the **${{ values.apiName }}** repository. Update your delegate implementations if the contract changed.

## Catalog

This service is registered in the Backstage Catalog as a **Component** linked to **${{ values.existingApiRef }}** via `providesApis`.

- Component: [${{ values.name }}](https://${{ values.repoProvider }}.com/${{ values.repoOwner }}/${{ values.name }})
- Provides API: ${{ values.existingApiRef }}

## Owner

Team: **${{ values.owner }}** — System: **${{ values.system }}** — Domain: **${{ values.domain }}**

