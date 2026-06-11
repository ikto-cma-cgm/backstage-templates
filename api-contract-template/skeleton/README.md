# ${{ values.name }}

${{ values.description }}

## Overview

This repository contains the OpenAPI 3.0 specification for the **${{ values.name }}** API.

Edit `openapi.yaml` to define your API contract. The specification is registered in the Backstage Catalog as an `API` entity and can be referenced by services using `providesApis`.

## Catalog entity

- `API`: OpenAPI contract for **${{ values.name }}**

## Getting started

1. Edit `openapi.yaml` to add your paths, schemas, and responses
2. Commit and push — the Catalog entry updates automatically
3. Reference from your service: `providesApis: [${{ values.name }}]`

## Validation

```bash
npx @stoplight/spectral-cli lint openapi.yaml
```
