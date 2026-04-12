import express from 'express';
import {
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
  getAllComments
} from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/', protect, createComment);
router.get('/post/:postId', getPostComments);
router.get('/all', protect, admin, getAllComments);
router.put('/:id', protect, updateComment);
router.delete('/:id', protect, deleteComment);

export default router;