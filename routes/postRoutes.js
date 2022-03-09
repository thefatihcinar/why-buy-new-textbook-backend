import express from 'express'
import { addPost, updatePost, deletePost, getPost, favoritePost } from '../controllers/postController.js'

const router = express.Router();

// post '/posts/7' => 7. ilan
// post '/posts/favorite-post' => 7. ilan, 8. ilan gibi favorilere ekler
// post '/posts/post-information' => kişinin ilan id'sini alarak güncelleme yaparız veya sileriz


router.route("/").post(addPost);
router.route("/post-information").put(updatePost);
router.route("/post-information").post(deletePost);
router.route("/").get(getPost);
router.route("/favorite-post").post(favoritePost);

export default router;