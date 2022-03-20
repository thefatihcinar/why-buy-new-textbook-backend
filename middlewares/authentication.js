import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken';

/* Models */
import User from '../models/userModel.js'


const authenticate =  asyncHandler( async (request, response, next) => {
    /* 
      this middleware is responsible for verifying the token sent by the user
      in order to implement any authorization or authentication logic
      in user specific routes, use this middleware
    */

    if( request.headers.authorization && request.headers.authorization.startsWith('Bearer')){

      /* validate this token */ 
      let token;

      try {
        token = request.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        request.user = await User.findById(decoded.id).select('-password -updatedAt -createdAt -__v');

        next();

      } catch (error) {
        /* Token is modified, i.e. not verified. */
        response.status(401);
        throw new Error("not authorized, token not verified");
      }

    }
    else{
      /* when the user does not provide a token or does not send a JWT (Bearer) token */
      response.status(401);
      throw new Error("not authorized, token missing");
    }
})

const softAuthentication = asyncHandler( async (request, response, next) => {
  /* this middleware softly authenticates a user,
     this means that there might not be a valid user, if there is not a valid user
     let them go, 
     but if there is user with a token, make sure who they sey they are */

  if( request.headers.authorization && request.headers.authorization.startsWith('Bearer')){
    /* If a JWT token is provided, make hard authentication */
    return authenticate(request,response,next);
  }
  else{
    /* if no token, or invalidly-formatted auth data is provided, do not authenticate them
       but give them access */
    next();
  }
})

export { authenticate, softAuthentication };

