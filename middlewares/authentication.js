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

export default authenticate;

