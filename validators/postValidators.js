import { body, validationResult } from 'express-validator' 

const createPostValidator = [
  body('title').isEmail(),
  body('description').isLength({ min: 5 }),
];

const editPostValidator = [
  body('title').isEmail(),
  body('description').isLength({ min: 5 }),
];

export { createPostValidator, editPostValidator };