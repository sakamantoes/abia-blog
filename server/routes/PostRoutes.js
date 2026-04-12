import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} from '../controllers/postController.js';

import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(upload.single('image'),protect, admin, createPost);

router.route('/:id')
  .get(getPostById)
  .put(upload.single('image'), protect, admin, updatePost)
  .delete(protect, admin, deletePost);

export default router;