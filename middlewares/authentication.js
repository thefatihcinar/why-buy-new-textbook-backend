import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken';

/* Models */
import User from '../models/userModel.js'


const authenticate =  asyncHandler( async (request, response, next) => {
    /* 
       this middleware verifies the JWT tokens,
       in order to implement authorization logic to user-specific pages 
       use this middleware 
    */

    if( request.headers.authorization && request.headers.authorization('Bearer')){

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



