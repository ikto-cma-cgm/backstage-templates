import { Request, Response, Router } from 'express';

const router = Router();

const swaggerUrl = '${{ values.swaggerUrl }}';

const generateApi = async () => {
  const { execSync } = await import('child_process');
  execSync(
    `npx openapi-generator-cli generate -i ${swaggerUrl} -g typescript-axios -o src/api/generated`,
    { stdio: 'inherit' },
  );
  console.log('API code generated successfully');
};

router.post('/generate', async (_req: Request, res: Response) => {
  try {
    await generateApi();
    res.status(200).json({ message: 'API code generated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate API code' });
  }
});

export default router;
