import { Router } from 'express';
import { createActivity, removeLikeActivity } from '../controllers/activity.controller';

const router = Router();

router.post('/view', createActivity('view'));
router.post('/like', createActivity('like'));
router.post('/comment', createActivity('comment'));
router.post('/share', createActivity('share'));
router.post('/unlike', removeLikeActivity);
export default router;
