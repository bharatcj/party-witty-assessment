import { Router } from 'express';
import { getScore } from '../controllers/user.controller';

const router = Router();

router.get('/:userId/score', getScore);

export default router;
