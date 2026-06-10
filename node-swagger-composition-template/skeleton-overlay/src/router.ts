import { Router, Request, Response } from 'express';
import type { components } from './api/types';

// Types générés depuis la spec OpenAPI par `npm run generate`.
// Après `npm run fetch-spec`, mettez à jour ces aliases avec vos propres schemas.
type HealthResponse = components['schemas']['HealthResponse'];

const router = Router();

// express-openapi-validator valide chaque requête avant d'atteindre ce handler.
router.get('/health', (_req: Request, res: Response) => {
  const body: HealthResponse = { status: 'UP' };
  res.status(200).json(body);
});

// TODO: ajoutez ici une route par endpoint défini dans votre spec OpenAPI.
// Exemple :
//
// import type { components } from './api/types';
// type MyResource = components['schemas']['MyResource'];
//
// router.get('/my-resource', (_req, res) => {
//   const result: MyResource = { id: '1', name: 'example' };
//   res.status(200).json(result);
// });

export default router;
