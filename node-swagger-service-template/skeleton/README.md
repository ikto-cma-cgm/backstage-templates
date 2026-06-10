# ${{ values.name }}

${{ values.description }}

## Technologies

- Node.js ${{ values.nodeVersion }}
- Express 4.x
- TypeScript 5.x
- npm

## Source of truth

The OpenAPI specification at `src/api/openapi.yaml` is the **source of truth** for this service API. Controller interfaces and DTO models are auto-generated from it at build time via the OpenAPI Generator CLI.

To regenerate after editing the spec:

```bash
npm run generate:api
```

## Run locally

```bash
npm install
npm run dev
```

Swagger UI: `http://localhost:3000/api-docs`

## Monitoring

Health endpoints exposed at `http://localhost:3000/health`.

## Implementing the API

Generated controller stubs and DTO interfaces are placed in `src/api/`. Implement each controller with real business logic. Example:

```typescript
import { Request, Response } from 'express';

export const myResourceController = {
  getItems: async (_req: Request, res: Response) => {
    // TODO: implement business logic
    res.json([]);
  },

  getItemById: async (req: Request, res: Response) => {
    const { id } = req.params;
    // TODO: implement business logic
    res.json({ id });
  },
};
```
