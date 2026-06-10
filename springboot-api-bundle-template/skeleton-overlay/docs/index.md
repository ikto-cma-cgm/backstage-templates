# ${{ values.name }}

${{ values.description }}

## Overview

Spring Boot 3 REST service with an embedded OpenAPI spec. The API contract lives alongside the implementation in the same repository.

- **Component**: `${{ values.name }}` — the runtime service
- **API**: `${{ values.name }}-api` — OpenAPI spec at `src/main/resources/api/openapi.yaml`
- **System**: ${{ values.system }} / **Domain**: ${{ values.domain }}

## Quick start

```bash
make init && make run
```

Swagger UI: http://localhost:8080/swagger-ui.html
