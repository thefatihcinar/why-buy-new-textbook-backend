import express from 'express'
import { createPost, updatePost, deletePost, getPost, favoritePost } from '../controllers/postController.js'

const router = express.Router();

router.route("/").post(createPost);
router.route("/:id").put(updatePost);
router.route("/:id").delete(deletePost);
router.route("/:id").get(getPost);
router.route("/:id/favorite").put(favoritePost);

export default router;