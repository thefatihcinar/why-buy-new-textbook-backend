import express from 'express'
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'


const router = express.Router();

// post '/users/login' => Hosgeldin Bengu

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get(getUserProfile);
router.route("/profile").put(updateUserProfile);


export default router;
