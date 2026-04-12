import asyncHandler from 'express-async-handler';
import db from '../models/index.js';

// @desc    Toggle like on a post
// @route   POST /api/likes/toggle
// @access  Private
const toggleLike = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  
  const post = await db.Post.findByPk(postId);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  const existingLike = await db.Like.findOne({
    where: {
      userId: req.user.id,
      postId
    }
  });
  
  if (existingLike) {
    await existingLike.destroy();
    res.json({ liked: false, message: 'Post unliked' });
  } else {
    await db.Like.create({
      userId: req.user.id,
      postId
    });
    res.json({ liked: true, message: 'Post liked' });
  }
});

// @desc    Check if user liked a post
// @route   GET /api/likes/check/:postId
// @access  Private
const checkLike = asyncHandler(async (req, res) => {
  const like = await db.Like.findOne({
    where: {
      userId: req.user.id,
      postId: req.params.postId
    }
  });
  res.json({ liked: !!like });
});

// @desc    Get like count for a post
// @route   GET /api/likes/count/:postId
// @access  Public
const getLikeCount = asyncHandler(async (req, res) => {
  const count = await db.Like.count({
    where: { postId: req.params.postId }
  });
  res.json({ count });
});

export default {
  toggleLike,
  checkLike,
  getLikeCount
};