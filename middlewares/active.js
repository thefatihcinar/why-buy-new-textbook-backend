import asyncHandler from 'express-async-handler';

/* Activity Middleware */
const active = asyncHandler( async (request, response, next) => {
  /* this middleware is responsible for checking if the user is active or inactive */
  /* makes sure that inactive users do not access or modify any data */
    
    if(request.user.isActive === true){
      next();
    }
    else{
      // if this user is an inactive user, do not authorize him
      
      response.status(403);
      throw new Error("Inactive User");
    }

})


export default active;

