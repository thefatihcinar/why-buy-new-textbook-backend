import express from 'express'
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'

/* Middlewares */
import { authenticate, softAuthentication } from '../middlewares/authentication.js'
import { usersAuthorization } from '../middlewares/authorization.js'
import active from '../middlewares/active.js'

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authenticate, logoutUser);
router.route("/profile").get(authenticate, active, usersAuthorization, getUserProfile);
router.route("/profile").put(authenticate, active, usersAuthorization, updateUserProfile);

export default router;
