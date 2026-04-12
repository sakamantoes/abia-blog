import express from 'express';
import {
  toggleLike,
  checkLike,
  getLikeCount
} from '../controllers/likeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/toggle', protect, toggleLike);
router.get('/check/:postId', protect, checkLike);
router.get('/count/:postId', getLikeCount);

export default router;