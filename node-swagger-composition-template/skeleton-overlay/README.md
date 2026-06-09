# ${{ values.name }}

${{ values.description }}

## Overview

Ce service suit une approche **OpenAPI-first** Node.js.

| Couche | Outil | Rôle |
|---|---|---|
| Fetch spec | `scripts/fetch-spec.mjs` | Télécharge `openapi.yaml` depuis `${{ values.apiRef }}` |
| Génération types | `openapi-typescript` | Génère `src/api/types.ts` depuis la spec |
| Validation requêtes | `express-openapi-validator` | Valide automatiquement chaque requête contre la spec |
| Routing | Express standard | Routes classiques `router.get/post/...` |

## Catalog entities

| Entité | Kind |
|---|---|
| `${{ values.name }}` | Component (service Node.js) |
| `${{ values.apiRef }}` | API (contrat OpenAPI — repo séparé) |
| `${{ values.system }}` | System |

## Getting started

> Exportez votre token pour accéder au repo de la spec :
{%- if values.repoProvider == 'github' %}
> ```bash
> export GITHUB_TOKEN=ghp_xxxxxxxxxxxx
> ```
{%- else %}
> ```bash
> export GITLAB_TOKEN=glpat_xxxxxxxxxxxx
> ```
{%- endif %}

```bash
npm install

# 1. Télécharge la spec depuis ${{ values.repoOwner }}/${{ values.apiEntityName }}
npm run fetch-spec

# 2. Génère src/api/types.ts (automatique avant dev/build)
npm run dev      # port ${{ values.port }}
```

Santé : `curl http://localhost:${{ values.port }}/health`

## Ajouter une route

Après `npm run fetch-spec`, ajoutez votre route dans `src/router.ts` :

```typescript
import type { components } from './api/types';
type MyResource = components['schemas']['MyResource'];

router.get('/my-resource', (_req, res) => {
  const result: MyResource = { ... };
  res.status(200).json(result);
});
```

`express-openapi-validator` valide automatiquement la requête avant d'atteindre le handler.  
Les requêtes invalides reçoivent un `400` avec le détail des erreurs de validation.

## Build & Docker

```bash
npm run build    # génère les types → compile → copie la spec dans dist/api/
docker build -t ${{ values.name }}:local .
docker run -p ${{ values.port }}:${{ values.port }} ${{ values.name }}:local
```
