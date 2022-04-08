import express from 'express'
import { getCreatePostForm, getRegisterForm, getUpdatePostForm } from '../controllers/formController.js'

/* Middlewares */
import { authenticate } from '../middlewares/authentication.js'
import active from '../middlewares/active.js'

const router = express.Router();

router.route("/create-post").get(authenticate, active, getCreatePostForm);
router.route("/update-post").get(authenticate, active, getUpdatePostForm);
router.route("/register").get(getRegisterForm);

export default router;
