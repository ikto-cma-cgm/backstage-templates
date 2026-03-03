import express from 'express';
import exampleRoutes from './example.routes.js';

const router = express.Router();

// Mount sub-routes
router.use('/examples', exampleRoutes);

// API root endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    version: 'v1',
    endpoints: {
      examples: '/api/v1/examples',
      health: '/health',
      docs: '/api-docs',
    },
  });
});

export default router;
