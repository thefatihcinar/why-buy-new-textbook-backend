import express from 'express'
/* Controllers */
import { createPost, updatePost, deletePost, getPost, favoritePost, getRecommendedPosts } from '../controllers/postController.js'
/* Middlewares */
import { authenticate, softAuthentication } from '../middlewares/authentication.js'
import { postsAuthorization } from '../middlewares/authorization.js'
import active from '../middlewares/active.js'

const router = express.Router();

router.route("/").get(softAuthentication, getRecommendedPosts);
router.route("/").post(authenticate, active, createPost);
router.route("/:id").put(authenticate, active, postsAuthorization, updatePost);
router.route("/:id").delete(authenticate, active, postsAuthorization, deletePost);
router.route("/:id").get(getPost);
router.route("/:id/favorite").put(authenticate, active, favoritePost);

export default router;