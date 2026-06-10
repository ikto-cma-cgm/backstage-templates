import path from 'path';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';

import router from './router';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? ${{ values.port }});

app.use(express.json());

// Validates every request against the OpenAPI spec before it reaches a route handler.
// Returns 400 on invalid requests with the exact validation errors from the spec.
// Spec is at src/api/openapi.yaml (dev) or dist/api/openapi.yaml (prod via postbuild).
app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, 'api/openapi.yaml'),
    validateRequests: true,
    validateResponses: false,
  }),
);

app.use(router);

// Error handler — catches express-openapi-validator errors and any unhandled errors
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status ?? 500).json({
    code: err.name ?? 'INTERNAL_ERROR',
    message: err.message,
    errors: err.errors,
  });
});

app.listen(port, () => console.log(`${{ values.name }} listening on port ${port}`));
