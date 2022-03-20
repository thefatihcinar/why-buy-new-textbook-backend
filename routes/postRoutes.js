import express from 'express'
/* Controllers */
import { createPost, updatePost, deletePost, getPost, favoritePost, getRecommendedPosts } from '../controllers/postController.js'
/* Middlewares */
import { authenticate, softAuthentication } from '../middlewares/authentication.js'
import { postsAuthorization } from '../middlewares/authorization.js'

const router = express.Router();

router.route("/").get(softAuthentication, getRecommendedPosts);
router.route("/").post(authenticate, createPost);
router.route("/:id").put(authenticate, postsAuthorization,  updatePost);
router.route("/:id").delete(authenticate, postsAuthorization, deletePost);
router.route("/:id").get(getPost);
router.route("/:id/favorite").put(authenticate, favoritePost);

export default router;