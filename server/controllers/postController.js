
import asyncHandler from "express-async-handler";
import db from "../models/index.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

// @desc    Create post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  let imageUrl = null;

  if (req.file) {
    const uploadResult = await uploadToCloudinary(req.file.buffer);
    imageUrl = uploadResult.secure_url;
  }

  const post = await db.Post.create({
    title,
    content,
    image: imageUrl,
    userId: req.user.id,
  });

  const postJson = post.toJSON();
  res.status(201).json({
    ...postJson,
    imageUrl: postJson.image,
  });
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await db.Post.findAll({
    include: [
      {
        model: db.User,
        attributes: ["id", "name", "email"],
      },
      {
        model: db.Like,
        attributes: ["userId"],
      },
      {
        model: db.Comment,
        attributes: ["id"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  // Format posts with like count and comment count
  const formattedPosts = posts.map((post) => {
    const postJson = post.toJSON();
    return {
      ...postJson,
      imageUrl: postJson.image,
      likeCount: postJson.Likes?.length || 0,
      commentCount: postJson.Comments?.length || 0,
      likedByUser: false, // Will be set by frontend based on user
    };
  });

  res.json(formattedPosts);
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await db.Post.findByPk(req.params.id, {
    include: [
      {
        model: db.User,
        attributes: ["id", "name", "email"],
      },
      {
        model: db.Comment,
        include: [
          {
            model: db.User,
            attributes: ["id", "name"],
          },
        ],
        order: [["createdAt", "DESC"]],
      },
      {
        model: db.Like,
        attributes: ["userId"],
      },
    ],
  });

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const postJson = post.toJSON();
  res.json({
    ...postJson,
    imageUrl: postJson.image,
    likeCount: postJson.Likes?.length || 0,
    commentCount: postJson.Comments?.length || 0,
  });
});

// @desc    Update post (Admin only)
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const post = await db.Post.findByPk(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const { title, content, imageUrl } = req.body;

  post.title = title || post.title;
  post.content = content || post.content;

  if (req.file) {
    const uploadResult = await uploadToCloudinary(req.file.buffer);
    post.image = uploadResult.secure_url;
  } else if (imageUrl !== undefined) {
    post.image = imageUrl;
  }

  await post.save();

  const postJson = post.toJSON();
  res.json({
    ...postJson,
    imageUrl: postJson.image,
  });
});

// @desc    Delete post (Admin only)
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await db.Post.findByPk(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  await post.destroy();
  res.json({ message: "Post removed" });
});

// @desc    Upload image
// @route   POST /api/posts/upload
// @access  Private/Admin
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  const uploadResult = await uploadToCloudinary(req.file.buffer);
  res.status(200).json({ url: uploadResult.secure_url });
});

export { createPost, getPosts, getPostById, updatePost, deletePost, uploadImage };
