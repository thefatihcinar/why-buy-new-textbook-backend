import { body, validationResult } from 'express-validator' 
/* Messages */
import msg from '../messages/postMessages.js'
/* Values For Type, City, Institution and Condition */
import TypesService  from '../services/typesService.js'
import CitiesService from '../services/citiesService.js'
import InstitutionsService from '../services/institutionsService.js'
import ConditionsService from '../services/conditionsService.js'


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
  body('type').isIn(TypesService.getTypes).withMessage(msg.INVALID_TYPE_FORMAT),

  /* validate for field: description*/
  body('description').notEmpty().withMessage(msg.DESCRIPTION_IS_REQUIRED),
  body('description').isLength({ min: 10, max: 3000 }).withMessage(msg.DESCRIPTION_LENGTH_MINIMUM_MAXIMUM_CHARACTERS),

  /* validate for field: condition*/
  body('condition').notEmpty().withMessage(msg.CONDITION_IS_REQUIRED),
  body('condition').isIn(ConditionsService.getConditions).withMessage(msg.INVALID_CONDITION_FORMAT),


  /* validate for field: city*/
  body('relatedCity').notEmpty().withMessage(msg.CITY_IS_REQUIRED),
  body('relatedCity').isIn(CitiesService.getAllCityIDs).withMessage(msg.INVALID_CITY_FORMAT),
  
  /* validate for field: institution*/
  body('relatedInstitution').isIn(InstitutionsService.getInstitutions).withMessage(msg.INVALID_INSTITUTION_FORMAT),

  /* validate for field: isShippable*/
  body('isShippable').isBoolean().withMessage(msg.SHIPPABLE_TRUE_OR_FALSE),

  /* validate for field: isAvailableForFacetoFaceSelling*/
  body('isAvailableForFacetoFaceSelling').isBoolean().withMessage(msg.FACETOFACESELLING_TRUE_OR_FALSE),
];

const editPostValidator = [
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
  body('type').isIn(TypesService.getTypes).withMessage(msg.INVALID_TYPE_FORMAT),

  /* validate for field: description*/
  body('description').notEmpty().withMessage(msg.DESCRIPTION_IS_REQUIRED),
  body('description').isLength({ min: 10, max: 3000 }).withMessage(msg.DESCRIPTION_LENGTH_MINIMUM_MAXIMUM_CHARACTERS),

  /* validate for field: condition*/
  body('condition').notEmpty().withMessage(msg.CONDITION_IS_REQUIRED),
  body('condition').isIn(ConditionsService.getConditions).withMessage(msg.INVALID_CONDITION_FORMAT),


  /* validate for field: city*/
  body('relatedCity').notEmpty().withMessage(msg.CITY_IS_REQUIRED),
  body('relatedCity').isIn(CitiesService.getAllCityIDs).withMessage(msg.INVALID_CITY_FORMAT),
  
  /* validate for field: institution*/
  body('relatedInstitution').isIn(InstitutionsService.getInstitutions).withMessage(msg.INVALID_INSTITUTION_FORMAT),

  /* validate for field: isShippable*/
  body('isShippable').isBoolean().withMessage(msg.SHIPPABLE_TRUE_OR_FALSE),

  /* validate for field: isAvailableForFacetoFaceSelling*/
  body('isAvailableForFacetoFaceSelling').isBoolean().withMessage(msg.FACETOFACESELLING_TRUE_OR_FALSE),
];

export { createPostValidator, editPostValidator };