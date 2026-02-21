import { Router } from 'express';
import { createActivity } from '../controllers/activity.controller';

const router = Router();

router.post('/view', createActivity('view'));
router.post('/like', createActivity('like'));
router.post('/comment', createActivity('comment'));
router.post('/share', createActivity('share'));

export default router;
