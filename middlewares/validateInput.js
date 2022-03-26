import asyncHandler from "express-async-handler"
import { validationResult } from "express-validator"
import { StatusCodes } from "http-status-codes";

/* Validator Function */
const validateInput = asyncHandler( async (request, response, next) => {
  /* this middleware makes sure that the input is in the correct format
     if there is an error figured out by the express validator middleware before
     this middleware will not let the input pass to the controller */
  
   const errors = validationResult(request);

   if (!errors.isEmpty()) {
     return response.status(StatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
   }

   return next();
})

export default validateInput;
