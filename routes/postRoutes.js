import express from 'express'
/* Controllers */
import { createPost, updatePost, deletePost, getPost, favoritePost, getRecommendedPosts, markPostAsSold } from '../controllers/postController.js'
/* Middlewares */
import { authenticate, softAuthentication } from '../middlewares/authentication.js'
import { postsAuthorization } from '../middlewares/authorization.js'
import active from '../middlewares/active.js'
import validateInput from '../middlewares/validateInput.js'
/* Validators */
import { createPostValidator, editPostValidator } from '../validators/postValidators.js'

const router = express.Router();

router.route("/").get(softAuthentication, getRecommendedPosts);
router.route("/").post(authenticate, active, createPostValidator, validateInput, createPost);
router.route("/:id").put(authenticate, active, postsAuthorization, editPostValidator, validateInput, updatePost);
router.route("/:id").delete(authenticate, active, postsAuthorization, deletePost);
router.route("/:id").get(getPost);
router.route("/:id/favorite").put(authenticate, active, favoritePost);
router.route("/:id/sold").put(authenticate, active, postsAuthorization, markPostAsSold);

export default router;