import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import healthRouter from './routes/health';
import { logger } from './config/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/health', healthRouter);

app.get('/', (req, res) => {
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
