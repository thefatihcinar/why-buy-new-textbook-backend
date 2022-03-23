import asyncHandler from 'express-async-handler';
import Post from "../models/postModel.js"
import User from '../models/userModel.js';
/* Services */
import PostsService from '../services/postsService.js';
/* Utilities */
import { isEmpty } from '../utilities/emptiness.js';

// @desc    create new posts
// @route   POST /posts
// @access  private 
const createPost = asyncHandler( async (request, response) => {

    // To-Do: Get the post information from json 
    // To-Do: Create post in database
    // To-Do: Return the posts

    let createdPost = PostsService.createNewPost(request.body, request.user);
    
    response.send(createdPost)
})

// @desc    get specific posts with given keywords and filters 
// @route   GET /posts/filterandsearch
// @access  public 
const searchPost = asyncHandler( async (request, response) => {

    /* this service searches for posts with given search/filtering parameters */

    // TO-DO: Implement service

    response.send("Searched posts")
})

// @desc    add new image to an existing post
// @route   POST /posts/:id/images
// @access  private 
const addImagetoPost = asyncHandler( async (request, response) => {
    // To-Do : Get the images file
    // To-Do: Upload Image to AWS S3
    // To-Do: Get Post Id from route
    // To-Do: Insert image url into images array
    

    response.send("Add image to post")
})

// @desc    update an existing post
// @route   PUT /posts/:id
// @access  private 
const updatePost = asyncHandler( async (request, response) => {

    // To-Do: Get the product id from route
    // To-Do: Get the NEW POST INFORMATION from body 
    // To-Do: Go get the posts with the given id & update it 
    let updatedPost = await PostsService.updatePost(request.params.id, request.body);
    
    response.send(updatedPost)
})

// @desc    delete an existing post
// @route   DELETE /posts/:id
// @access  private 
const deletePost = asyncHandler( async (request, response) => {

    // To-Do: Get the id from route
    // To-Do: Get the post from database with given id 
    // To-Do: Delete this post from database
    
    let deleteConfigurations = {softDelete: true, hardDelete: false};
    let deletedPost = await PostsService.deletePost(request.params.id, deleteConfigurations)

    response.send(deletePost)
})

// @desc    get a specific post with a given id
// @route   GET /posts/:id
// @access  public 
const getPost = asyncHandler( async (request, response) => {

    let post = await PostsService.getPostByID(request.params.id);

    if(isEmpty(post)){
        response.status(404);
        throw new Error("post not found");
    }
    
    response.send(post);
})

// @desc    favorite an existing post
// @route   PUT /posts/:id/favorite
// @access  private 
const favoritePost = asyncHandler( async (request, response) => {
    // To-Do: Get the post id from route
    // To-Do: Learn who connects from token/session
    // To-Do: Update post as favorite or unfavorite for the user
    
    response.send("Make post favorite")
});

// @desc    get the recommended posts (main page posts) for logged-in or not-logged-in users 
// @route   GET /posts
// @access  public/private 
const getRecommendedPosts = asyncHandler( async (request, response) => {
    /* this controller will get the recommended posts for the desiring user, in order to
       be displayed in main page
       even if there is not an authenticated user, still recommends posts based on a logic developed */

    // To-do: Learn whether there is a user or not
    // To-d: make recommendations based on that

    response.send("main page posts");
});

// @desc    get the user's posts for logged-in users 
// @route   GET /users/:id/posts
// @access  private 
const getPostsByUserID = asyncHandler( async (request, response) => {
    /* this controller will get the posts of the authenticated and authorized user */

    let post = await PostsService.getPostsByUserID(request.user.id);
    
    response.send(post);
});

// @desc    get the starred posts for logged-in users 
// @route   GET /users/:id/favorites
// @access  private 
const getStarredPostsByUserID = asyncHandler( async (request, response) => {
    /* this controller gets all the posts that are starred by the given user id.
       the user must be authenticated and authorized to access his/her starred posts */

       let starredPostsOfUser = await PostsService.getStarredPostsByUserID(request.user.id)

       response.send(starredPostsOfUser);
});
export {createPost, updatePost, deletePost, getPost, favoritePost, getRecommendedPosts};