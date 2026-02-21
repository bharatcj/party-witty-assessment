import { Router } from 'express';
import { getFeed } from '../controllers/feed.controller';

const router = Router();

router.get('/:userId', getFeed);

export default router;
