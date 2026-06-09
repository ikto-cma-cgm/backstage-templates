# Node.js Microservice with OpenAPI Spec

Scaffolds a Node.js Express microservice wired to an existing OpenAPI spec entity, with openapi-backend for spec-first request routing and validation.

## Composition strategy

This template is a **composable orchestrator** using the remote fetch strategy (C01 compliant):

| Step | Source | Pinned ref |
|---|---|---|
| `fetch-node-skeleton` | `node-template/skeleton` | `node-template/v0.1.0` (GitHub tag) |
| `fetch-openapi-overlay` | `./skeleton-overlay` | Local delta — openapi-backend wiring |

The base Node.js structure (Dockerfile, tsconfig, .gitignore, docs scaffolding) is **reused** from the canonical `node-template` via its published tag. Only the openapi-backend delta is maintained locally in this template.

## Prerequisites

Before running this template, create the API entity using the **OpenAPI Specification** template (`swagger-template`). The resulting `kind: API` entity will be selectable in the `apiRef` parameter.

## What is generated

```
<name>/
├── catalog-info.yaml     # Component (Node service) + System
├── src/
│   ├── index.ts          # Express + openapi-backend routing
│   ├── api/
│   │   └── openapi.yaml  # Spec placeholder — replace with real spec
│   └── handlers/
│       └── index.ts      # One export per operationId
├── package.json          # Includes openapi-backend
├── Dockerfile            # Multi-stage, copies spec into image
├── tsconfig.json         # From node-template base
└── ...                   # Standard Node.js project files
```

## Catalog relations produced

```
System: <system>
  └── Component: <name>  (providesApis → API: <apiRef>)
                         (dependsOn    → API: <apiRef>)
```
