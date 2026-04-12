import asyncHandler from 'express-async-handler';
import db from '../models/index.js';

// @desc    Create comment
// @route   POST /api/comments
// @access  Private
const createComment = asyncHandler(async (req, res) => {
  const { content, postId } = req.body;
  
  const post = await db.Post.findByPk(postId);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  const comment = await db.Comment.create({
    content,
    userId: req.user.id,
    postId
  });
  
  const commentWithUser = await db.Comment.findByPk(comment.id, {
    include: [{ model: db.User, attributes: ['id', 'name'] }]
  });
  
  res.status(201).json(commentWithUser);
});

// @desc    Get comments for a post
// @route   GET /api/comments/post/:postId
// @access  Public
const getPostComments = asyncHandler(async (req, res) => {
  const comments = await db.Comment.findAll({
    where: { postId: req.params.postId },
    include: [{ model: db.User, attributes: ['id', 'name'] }],
    order: [['createdAt', 'DESC']]
  });
  res.json(comments);
});

// @desc    Update comment (User can edit own comment)
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  const comment = await db.Comment.findByPk(req.params.id);
  
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }
  
  // Check if user owns the comment OR is admin
  if (comment.userId !== req.user.id && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to edit this comment');
  }
  
  comment.content = req.body.content;
  await comment.save();
  
  const updatedComment = await db.Comment.findByPk(comment.id, {
    include: [{ model: db.User, attributes: ['id', 'name'] }]
  });
  
  res.json(updatedComment);
});

// @desc    Delete comment (User can delete own, admin can delete any)
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await db.Comment.findByPk(req.params.id);
  
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }
  
  // Check if user owns the comment OR is admin
  if (comment.userId !== req.user.id && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete this comment');
  }
  
  await comment.destroy();
  res.json({ message: 'Comment deleted' });
});

// @desc    Get all comments (Admin only)
// @route   GET /api/comments/all
// @access  Private/Admin
const getAllComments = asyncHandler(async (req, res) => {
  const comments = await db.Comment.findAll({
    include: [
      { model: db.User, attributes: ['id', 'name', 'email'] },
      { model: db.Post, attributes: ['id', 'title'] }
    ],
    order: [['createdAt', 'DESC']]
  });
  res.json(comments);
});

export{
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
  getAllComments
};