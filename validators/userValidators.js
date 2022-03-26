import { body, validationResult } from 'express-validator' 
/* Messages */
import msg from '../messages/userValidationMessages.js'


const createNewUserValidator = [
  /* validate for field: name */
  /* validate for field: email */
  body('email').isEmail().withMessage(msg.INVALID_EMAIL_FORMAT),
  /* validate for field: password */
  body('password').isLength({ min: 8 }).withMessage(msg.PASSWORD_LENGTH_BELOW_MINIMUM_CHARACTERS),
  body('password')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  .withMessage(msg.PASSWORD_IS_INCORRECT_FORM),
  /* validate for field: phoneNumber */
  body('phoneNumber').isMobilePhone('tr-TR').withMessage(msg.INVALID_PHONE_NUMBER),
];

const loginUserValidator = [
  /* validate for field: email */
  body('email').isEmail(),
  body('email').exists(), 
  /* validate for field: password */ 
  body('password').notEmpty(),
  body('password').exists(),
  body('password').notEmpty(),
  body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
];

const updateUserProfileValidator = [
  /* validate for field: name */
  body('name').notEmpty(),
  body('name').exists(),
  /* validate for field: email */
  /* email must be empty */
  body('email').isEmpty().withMessage(msg.EMAIL_CANNOT_BE_MODIFIED),
  /* validate for field: password */
  body('password').isEmpty().withMessage(msg.PASSWORD_CANNOT_BE_MODIFIED),
  /* validate for field: phoneNumber */
  body('phoneNumber').isMobilePhone('tr-TR').withMessage(msg.INVALID_PHONE_NUMBER),
];

export { loginUserValidator,  createNewUserValidator, updateUserProfileValidator };