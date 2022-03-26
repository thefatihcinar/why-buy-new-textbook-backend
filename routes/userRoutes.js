import express from 'express'
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'

/* Middlewares */
import { authenticate, softAuthentication } from '../middlewares/authentication.js'
import { usersAuthorization } from '../middlewares/authorization.js'
import active from '../middlewares/active.js'
/* Validators */
import { createNewUserValidator, loginUserValidator, updateUserProfileValidator } from '../validators/userValidators.js'

const router = express.Router();

router.route("/").post(createNewUserValidator, registerUser);
router.route("/login").post(loginUserValidator, loginUser);
router.route("/profile").get(authenticate, active, usersAuthorization, getUserProfile);
router.route("/profile").put(authenticate, active, usersAuthorization, updateUserProfileValidator, updateUserProfile);

export default router;
