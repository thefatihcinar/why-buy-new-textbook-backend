import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes';
/* Models */
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
/* Messages */
import postMessages from '../messages/postMessages.js';
import userMessages from '../messages/userMessages.js';


const postExistence = asyncHandler(async (request, response, next) => {
  /* this middleware makes sure that the requested entity exists
     before proceeding to the next middleware (controller) */ 
  const requestedResourceID = request.params.id;

  const post = await Post.findById(requestedResourceID);

  /* if there is no such a post, return NOT_FOUND */
  if (!post) {
    response.status(StatusCodes.NOT_FOUND);
    throw new Error(postMessages.POST_NOT_FOUND);
  }

  next();
});

const userExistence = asyncHandler(async (request, response, next) => {
  /* this middleware makes sure that the requested entity exists
     before proceeding to the next middleware (controller) */ 
  const requestedResourceID = request.params.id;

  const user = await Post.findById(requestedResourceID);

  /* if there is no such a USER, return NOT_FOUND */
  if (!user) {
    response.status(StatusCodes.NOT_FOUND);
    throw new Error(userMessages.USER_NOT_FOUND);
  }

  next();
});

export { postExistence, userExistence };