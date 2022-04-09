import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
/* Models */
import User from '../models/userModel.js';
/* Messages */
import msg from '../messages/userMessages.js';

/* Posts Authorization Middleware */
const postsAuthorization = asyncHandler(async (request, response, next) => {
  /* this middleware is responsible for checking if the user is the owner of the post */
  /* makes sure that the user does not modify other users posts */

    /* this id represents which posts is desired to be modified or accessed */
    let requestedResourceId = request.params.id;
    
    /* Check whether this post is owned by the user or not */
    let results = await User.find({_id: request.user.id, publishedPosts: { "$in" : [requestedResourceId]} } );
    
    let isPostedByThisUser = results.length !== 0;
    // if there is a result coming back from the database

    if(isPostedByThisUser){
      // if this user wants to modify or access his/her own post
      // allow it
      next();
    }
    else{
      // if this users wants to modify or access other users posts
      // make sure forbidden
      response.status(403).send("Forbidden");
    }

})

const usersAuthorization = asyncHandler(async (request, response, next) => {
  /* this middleware makes sure that users do not modify other users' data */

  /* Get which user is desired to accessed by this user */
  const requestedUserId = request.params.id;

  /* Make sure this is the same user as authenticated */
  /* in other words do not allow, this user to access other user's data */

  /* If this user wants to change its own data, then next() */
  if( requestedUserId === request.user._id){
    next();
  }
  else{
    /* this user wants to access other people's data */
    const error = new Error();
      error.message = msg.USER_NOT_AUTHORIZED;
      error.code = StatusCodes.FORBIDDEN;
    throw error;
  }

})


export { postsAuthorization, usersAuthorization };

