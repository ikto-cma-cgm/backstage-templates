# ${{ values.name }}

${{ values.description }}

## Contract

The API contract is defined in `openapi.yaml` at the root of this repository.
It follows the OpenAPI 3.0.3 specification and is registered in the Backstage Catalog.

## Catalog integration

The entity registered is of kind `API` with type `openapi`.
Services that implement this contract should reference it via `providesApis`.
