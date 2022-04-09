import express from 'express'
/* Controllers */
import { createPost, updatePost, deletePost, getPost, searchPost, getRecommendedPosts, markPostAsSold, starPost } from '../controllers/postController.js'
/* Middlewares */
import { authenticate, softAuthentication } from '../middlewares/authentication.js'
import { postsAuthorization } from '../middlewares/authorization.js'
import active from '../middlewares/active.js'
import validateInput from '../middlewares/validateInput.js'
import { postExistence } from '../middlewares/existence.js'
/* Validators */
import { createPostValidator, editPostValidator } from '../validators/postValidators.js'

const router = express.Router();

router.route("/").get(softAuthentication, getRecommendedPosts);
router.route("/").post(authenticate, active, createPostValidator, validateInput, createPost);
router.route("/search").get(softAuthentication, searchPost);
router.route("/:id").put(authenticate, active, postsAuthorization, postExistence, editPostValidator, validateInput, updatePost);
router.route("/:id").delete(authenticate, active, postsAuthorization, postExistence, deletePost);
router.route("/:id").get(postExistence, getPost);
router.route("/:id/star").put(authenticate, active, postExistence, starPost);
router.route("/:id/sold").put(authenticate, active, postsAuthorization, postExistence, markPostAsSold);

export default router;