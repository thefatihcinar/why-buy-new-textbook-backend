import { body, validationResult } from 'express-validator' 
/* Messages */
import msg from '../messages/postMessages.js'

const createPostValidator = [
  body('title').isEmail(),
  body('description').isLength({ min: 5 }),
];

const editPostValidator = [
  body('title').isEmail(),
  body('description').isLength({ min: 5 }),
];

export { createPostValidator, editPostValidator };