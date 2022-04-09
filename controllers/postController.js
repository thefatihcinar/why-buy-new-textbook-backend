import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
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

    let createdPost = PostsService.createNewPost(request.body, request.user);
    
    response.send(createdPost)
})

// @desc    get specific posts with given keywords and filters 
// @route   GET /posts/filterandsearch
// @access  public 
const searchPost = asyncHandler( async (request, response) => {

    /* this service searches for posts with given search/filtering parameters */

    /* get the search query string from the request */
    let queryString = request.query.query;
    /* get the page from the URL */
    let page = request.query.page;
    /* get the filters from the URL */
    let relatedInstitution = request.query.relatedInstitution;
    let relatedCity = request.query.relatedCity;
    let type = request.query.type;
    let condition = request.query.condition;

    /* Create filter object */
    let filter = {};

    /* add filters to the filter object */
    if(relatedInstitution) filter.relatedInstitution = relatedInstitution;
    if(relatedCity) filter.relatedCity = relatedCity;
    if(type) filter.type = type;
    if(condition) filter.condition = condition;
    // if any of the filters do not exist, do not include it in the filter object

    /* search for posts with the given query string and filters */
    let result = await PostsService.searchAndFilterPosts(queryString, filter, page);

    // To-do: Recommend Logic

    response.send(result);
})

// @desc    add new image to an existing post
// @route   POST /posts/:id/images
// @access  private 
const addImagetoPost = asyncHandler( async (request, response) => {
    // To-Do : Get the images file
    // To-Do: Upload Image to AWS S3
    // To-Do: Get Post Id from route
    // To-Do: Insert image url into images array
    
    let addedImagetoPost = await PostsService.addImageToPost(request.params.id, imageURL)

    response.send(addedImagetoPost)
})

// @desc    update an existing post
// @route   PUT /posts/:id
// @access  private 
const updatePost = asyncHandler( async (request, response) => {

    let updatedPost = await PostsService.updatePost(request.params.id, request.body);
    
    response.send(updatedPost)
})

// @desc    delete an existing post
// @route   DELETE /posts/:id
// @access  private 
const deletePost = asyncHandler( async (request, response) => {

    let deleteConfigurations = {softDelete: true, hardDelete: false};
    let deletedPost = await PostsService.deletePost(request.params.id, deleteConfigurations)

    response.send(deletedPost)
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
    
    let starredPost = await PostsService.starPost(request.params.id, request.user.id);

    response.send(starredPost)
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


// @desc    mark post as sold
// @route   PUT /posts/:id/sold
// @access  private
const markPostAsSold = asyncHandler( async (request, response) => {
    /* this service marks the post with the given post id as sold */

       let soldPost = await PostsService.markPostAsSold(request.params.id)

       response.send(soldPost);
});

export {createPost, searchPost, addImagetoPost, updatePost, deletePost, getPost, favoritePost, getRecommendedPosts, markPostAsSold};