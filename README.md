# CMA CGM Backstage Software Templates

Golden Paths officiels du Developer Portal CMA CGM.

## Templates disponibles

| Template | Type | Description |
|---|---|---|
| `node-template` | service | Node.js Express + TypeScript + Docker |
| `swagger-template` | api | OpenAPI Specification entity |
| `springboot-template` | service | Spring Boot + Maven + Docker |
| `springboot-liquibase-template` | library | Liquibase migrations (standalone) |
| `springboot-swagger-composition-template` | service | Spring Boot + OpenAPI spec (composition) |
| `springboot-liquibase-composition-template` | service | Spring Boot + Liquibase (composition) |
| `node-swagger-composition-template` | service | Node.js + OpenAPI spec (composition) |

## Architecture de composition

Les templates de composition (`*-composition-*`) utilisent une stratégie de **remote fetch** :

1. **Fetch du skeleton de base** → `node-template/skeleton` ou `springboot-template/skeleton` (ce repo, tag `v0.1.0`)
2. **Fetch de l'overlay OpenAPI** → `skeleton-overlay/` local (delta : catalog-info, package.json, src openapi)

```
fetch-node-skeleton  (remote → node-template/skeleton@v0.1.0)
      +
fetch-openapi-overlay (local → ./skeleton-overlay)
      ↓
repo généré avec Node.js + express-openapi-validator
```

## Versionnage

Tags SemVer : `v0.1.0`, `v0.2.0`, ...
