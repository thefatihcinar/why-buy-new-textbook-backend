import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import Post from "../models/postModel.js"
import User from '../models/userModel.js';
/* Services */
import PostsService from '../services/postsService.js';
import RecommendationService from '../services/recommendationService.js';
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
    let queryString = request.query.query || '';
    /* get the page from the URL */
    let page = request.query.page;

    let filter = createFiltersHelper(request);

    /* search for posts with the given query string and filters */
    let result = await PostsService.searchAndFilterPosts(queryString, filter, page);

    // Run The Recommendation Logic Right After Search 
    if(request.user)
        await RecommendationService.associateRecommendationsWithUser(queryString, request.user._id);

    response.send(result);
})

function createFiltersHelper(request) {
    /* this helper function creates a filter object from the parameters sent in request */

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

    return filter;
}

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
    
    response.send(post);
})

// @desc    star an existing post
// @route   PUT /posts/:id/star
// @access  private 
const starPost = asyncHandler( async (request, response) => {
    
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

    /* Check if there is an authenticated user */
    if( request.user ) {
        
        /* get where this controller is called from */
        /* is it called from the main page or is it called from a banner ? */
        const calledFrom = request.params.place;
        if( request.params.place === "BANNER" || request.params.place === "banner"  ) calledFrom = "BANNER";
        else calledFrom = "MAIN_PAGE";

        const recommendedPosts = await RecommendationService.recommendedPostsForUser(request.user._id, calledFrom);

        response.send(recommendedPosts);
    }
    /* If there is no authenticated user, fetch the newest posts */
    else {

        const newestPosts = await PostsService.getNewestPosts();
        response.send(newestPosts);
    }
});


// @desc    mark post as sold
// @route   PUT /posts/:id/sold
// @access  private
const markPostAsSold = asyncHandler( async (request, response) => {
    /* this service marks the post with the given post id as sold */

    let soldPost = await PostsService.markPostAsSold(request.params.id)

    response.send(soldPost);
});

export {createPost, searchPost, addImagetoPost, updatePost, deletePost, getPost, starPost, getRecommendedPosts, markPostAsSold};