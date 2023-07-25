import express from "express";
import { getFeedPosts, getUserPosts, likePosts, postComment, getPostById } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:postId", verifyToken, getPostById);


// UPDATE
router.patch("/:id/like", verifyToken, likePosts);

router.patch("/", verifyToken, postComment);


export default router;