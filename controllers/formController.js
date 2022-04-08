import asyncHandler from 'express-async-handler';
import Institution from '../models/institutionModel.js';
import City from '../models/cityModel.js';
/* Services */
import CitiesService from '../services/citiesService.js';
import InstitutionsService from '../services/institutionsService.js';
import TypesService from '../services/typesService.js';
import ConditionsService from '../services/conditionsService.js';



// @desc    get the form elements for creating a new post
// @route   GET /forms/create-post
// @access  private 
const getCreatePostForm = asyncHandler( async (request, response) => {
    /* this controller serves the form elements for creating a new post */
    /* the needed things are for example, the cities, the institutions */

    let formElements = {
        cities: await CitiesService.getCities(),
        institutions: await InstitutionsService.getInstitutions(),
        conditions: ConditionsService.getConditions(),
        types: TypesService.getTypes()
    }
    response.send(formElements)
})


// @desc    get the form elements for updating a new post
// @route   GET /forms/update-post
// @access  private 
const getUpdatePostForm = asyncHandler( async (request, response) => {
  /* this controller serves the form elements for updating a new post */
  /* the needed things are for example, the cities, the institutions */

  let formElements = {
      cities: await CitiesService.getCities(),
      institutions: await InstitutionsService.getInstitutions(),
      conditions: ConditionsService.getConditions(),
      types: TypesService.getTypes()
  }
  response.send(formElements)
})

// @desc    get the form elements for registering a new user
// @route   GET /forms/register
// @access  public 
const getRegisterForm = asyncHandler( async (request, response) => {
  /* this controller serves the form elements for registering a new user */
  /* the needed things are for example, the institutions */

  let formElements = {
      institutions: await InstitutionsService.getInstitutions(),
  }

  response.send(formElements);
})




export { getCreatePostForm, getRegisterForm, getUpdatePostForm };
