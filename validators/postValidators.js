import { body, validationResult } from 'express-validator' 
/* Messages */
import msg from '../messages/postMessages.js'
/* Values For Type, City and Condition */
import types from '../data/types.js'
import cities from '../data/cities.json'
import conditions from '../data/conditions.js'


const createPostValidator = [
  /* validate for field: title*/
  body('title').notEmpty().withMessage(msg.TITLE_IS_REQUIRED),
  body('title').isLength({ min: 10, max: 125}).withMessage(msg.TITLE_LENGTH_MINIMUM_MAXIMUM_CHARACTERS),

  /* validate for field: price*/
  body('price').notEmpty().withMessage(msg.PRICE_IS_REQUIRED),
  body('price').isLength({ min: 1, max: 12}).withMessage(msg.PRICE_LENGTH_MINIMUM_MAXIMUM_CHARACTERS),
  body('price').isFloat({ gt: 0.0 }).withMessage(msg.PRICE_MUST_BE_NUMBER),
  body('price').isInt({ gt: 0 }).withMessage(msg.PRICE_MUST_BE_NUMBER),

  /* validate for field: author*/
  body('author').notEmpty().withMessage(msg.AUTHOR_IS_REQUIRED),
  body('author').isLength({ min: 1, max: 200}).withMessage(msg.AUTHOR_LENGTH_MINIMUM_MAXIMUM_CHARACTERS),

  /* validate for field: type*/
  body('type').notEmpty().withMessage(msg.TYPE_IS_REQUIRED),
  body('type').isIn(types).withMessage(msg.INVALID_TYPE_FORMAT),

  /* validate for field: description*/
  body('description').notEmpty().withMessage(msg.DESCRIPTION_IS_REQUIRED),
  body('description').isLength({ min: 10, max: 3000 }).withMessage(msg.DESCRIPTION_LENGTH_MINIMUM_MAXIMUM_CHARACTERS),

  /* validate for field: condition*/
  body('condition').notEmpty().withMessage(msg.CONDITION_IS_REQUIRED),
  body('condition').isIn(conditions).withMessage(msg.INVALID_CONDITION_FORMAT),


  /* validate for field: city*/
  body('city').notEmpty().withMessage(msg.CITY_IS_REQUIRED),
  body('city').isIn(cities).withMessage(msg.INVALID_CITY_FORMAT),

  /* validate for field: isShippable*/
  body('city').isBoolean().withMessage(msg.SHIPPABLE_TRUE_OR_FALSE),

  /* validate for field: isAvailableForFacetoFaceSelling*/
  body('city').isBoolean().withMessage(msg.FACETOFACESELLING_TRUE_OR_FALSE),
];

const editPostValidator = [
  body('title').isEmail(),
  body('description').isLength({ min: 5 }),
];

export { createPostValidator, editPostValidator };