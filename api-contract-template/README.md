# Swagger / OpenAPI Spec Template

Scaffolds a **standalone OpenAPI specification repository** and registers it as an `API` entity in the Backstage Catalog.

## Purpose

Use this template to create and publish an OpenAPI contract **before** implementing the service. The generated repository becomes the single source of truth for the API contract, and can later be referenced by `springboot-openapi-codegen-template` to generate the implementing service.

### What gets generated

```
<api-name>/
├── openapi.yaml       # OpenAPI 3.0 spec stub — fill in your contract
├── catalog-info.yaml  # Backstage API entity (kind: API, spec.type: openapi)
├── docs/index.md
└── mkdocs.yml
```

### Catalog registration

The generated `catalog-info.yaml` registers the repository as a `kind: API` entity with `spec.type: openapi`. It will appear in the Backstage Catalog under **APIs** and is discoverable by the `springboot-openapi-codegen-template` entity picker.

## Workflow

```
swagger-template                    springboot-openapi-codegen-template
      │                                           │
      ▼                                           │
  openapi.yaml ──── referenced by ───────────────▶  generates Java stubs
  (API entity)
```

## Usage

1. In Backstage, navigate to **Create → Swagger / OpenAPI Spec**
2. Fill in API name, description, owner, domain
3. After scaffolding: edit `openapi.yaml` with your contract
4. Push — the Catalog entity updates automatically via `catalog-info.yaml`
5. Use the API entity as input to `springboot-openapi-codegen-template`

## Parameters

| Parameter | Description |
|---|---|
| `name` | Kebab-case API name (becomes the repository name) |
| `description` | Short description visible in the Catalog |
| `owner` | Owning team (Backstage Group entity) |
| `system` | Backstage System this API belongs to |
| `domain` | Business domain (e.g. `shipping`, `finance`) |

## Ownership

- **Owner**: `group:default/it-development-software-engineering-developer-platform`
- **Support**: open an issue on the repository or reach out to the Developer Portal Team.
