import asyncHandler from 'express-async-handler';

/* Models */
import User from '../models/userModel.js';

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

export { postsAuthorization, usersAuthorization };

