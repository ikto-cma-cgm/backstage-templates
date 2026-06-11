# Register Service on Kong API Gateway

This template registers an existing Backstage Component on Kong API Gateway by creating (or updating) a **Kong Service** and a **Route**.

## When to use

After a service has been deployed and is reachable at a known URL.

**Do not use** during scaffolding — Kong routing only makes sense once the upstream service actually exists.

## What it does

1. Calls `PUT /services/{name}` on the Kong Admin API — idempotent upsert of the Kong Service
2. Calls `PUT /routes/{name}-route` on the Kong Admin API — idempotent upsert of the Route on path `/api/{name}/*`

## Parameters

| Parameter | Required | Description |
|---|---|---|
| `component` | Yes | Backstage Component to register (EntityPicker) |
| `upstreamUrl` | No | Real upstream URL. Defaults to `http://{name}:8080` |

## Updating the upstream after a new deployment

If the service URL changes (e.g. after a production deploy), update the upstream directly:

```bash
curl -X PATCH http://<kong-admin-host>:8001/services/<service-name> \
  -H "Content-Type: application/json" \
  -d '{"url": "http://<new-host>:<port>"}'
```

## Backend action

This template uses the custom scaffolder action `cma:kong:register-service`, implemented in `backstage/backstage-app/packages/backend/src/modules/kong/`.
