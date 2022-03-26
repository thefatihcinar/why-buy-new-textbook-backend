import { body, validationResult } from 'express-validator' 

const createNewUserValidator = [
  body('username').isEmail(),
  body('password').isLength({ min: 5 }),
];

const loginUserValidator = [
  body('username').isEmail(),
  body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
];

const updateUserProfileValidator = [];

export { loginUserValidator,  createNewUserValidator, updateUserProfileValidator };