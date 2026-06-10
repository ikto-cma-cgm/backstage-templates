import { Router } from 'express';
import { healthController } from '../controllers/healthController';

const router = Router();

router.get('/', healthController.health);
router.get('/ready', healthController.ready);
router.get('/live', healthController.live);

export default router;
