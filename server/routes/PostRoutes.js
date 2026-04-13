import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  uploadImage,
} from "../controllers/postController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protect, admin, upload.single("image"), createPost);
router.post("/upload", protect, admin, upload.single("image"), uploadImage);
router.get("/", getPosts);

router.get("/:id", getPostById);
router.put("/:id", protect, admin, upload.single("image"), updatePost);
router.delete("/:id", protect, admin, deletePost);

export default router;
