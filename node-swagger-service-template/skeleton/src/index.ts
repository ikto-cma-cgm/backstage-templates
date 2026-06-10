import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { join } from 'path';
import healthRouter from './routes/health';
import { logger } from './config/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  const openapiPath = join(__dirname, '../api/openapi.yaml');
  const swaggerDocument = JSON.parse(
    JSON.stringify(require('yaml').load(readFileSync(openapiPath, 'utf8'))),
  );
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
  logger.warn('OpenAPI spec not found — Swagger UI disabled', (err as Error).message);
}

app.use('/health', healthRouter);

app.get('/', (_req, res) => {
  res.json({
    name: '${{ values.name }}',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app;
