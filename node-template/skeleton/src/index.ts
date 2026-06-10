import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const serviceName = '${{ values.name }}';
const serviceVersion = process.env.npm_package_version ?? '0.1.0';
const port = Number(process.env.PORT ?? ${{ values.port }});

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'UP' });
});

app.get('/', (_req, res) => {
  res.json({ name: serviceName, version: serviceVersion });
});

app.listen(port, () => {
  console.log(`${serviceName} listening on port ${port}`);
});
