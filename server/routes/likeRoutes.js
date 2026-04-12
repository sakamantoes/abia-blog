import express from 'express';
import {
  toggleLike,
  checkLike,
  getLikeCount
} from '../controllers/likeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();