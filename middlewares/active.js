import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
/* Messages */
import msg from '../messages/userMessages.js';

/* Activity Middleware */
const active = asyncHandler( async (request, response, next) => {
  /* this middleware is responsible for checking if the user is active or inactive */
  /* makes sure that inactive users do not access or modify any data */
    
    if(request.user.isActive === true){
      next();
    }
    else{
      // if this user is an inactive user, do not authorize him
      const error = new Error();
        error.message = msg.USER_NOT_ACTIVE;
        error.code = StatusCodes.FORBIDDEN;
      throw error;
    }

})


export default active;

