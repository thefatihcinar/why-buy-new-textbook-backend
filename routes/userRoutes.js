import express from 'express'
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'

/* Middlewares */
import { authenticate, softAuthentication } from '../middlewares/authentication.js'
import active from '../middlewares/active.js'
import validateInput from '../middlewares/validateInput.js'
/* Validators */
import { createNewUserValidator, loginUserValidator, updateUserProfileValidator } from '../validators/userValidators.js'

const router = express.Router();

router.route("/").post(createNewUserValidator, validateInput, registerUser);
router.route("/login").post(loginUserValidator, validateInput, loginUser);
router.route("/profile").get(authenticate, active,  getUserProfile);
router.route("/profile").put(authenticate, active, updateUserProfileValidator, validateInput, updateUserProfile);

export default router;
