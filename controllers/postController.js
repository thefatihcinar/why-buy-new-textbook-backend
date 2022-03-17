import asyncHandler from 'express-async-handler';
import Post from "../models/postModel.js"

// @desc    create new posts
// @route   POST /posts
// @access  private 
const createPost = asyncHandler( async (request, response) => {

    // To-Do: Get the post information from json 
    // To-Do: Create post in database
    // To-Do: Return the posts
    
    let createdPost = await Post.create(request.body)
    response.send(createdPost)
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
    let updatedPost = await Post.findByIdAndUpdate(request.params.id, request.body, { new : true }) 
    response.send(updatedPost)
})

// @desc    delete an existing post
// @route   DELETE /posts/:id
// @access  private 
const deletePost = asyncHandler( async (request, response) => {

    // To-Do: Get the id from route
    // To-Do: Get the post from database with given id 
    let deletedPost = await Post.findByIdAndDelete(request.params.id);
    // To-Do: Delete this post from database

    response.send("post was deleted")
})

// @desc    get a specific post with a given id
// @route   GET /posts/:id
// @access  public 
const getPost = asyncHandler( async (request, response) => {

    console.log(request.params.id);

    let foundPost = await Post.findById(request.params.id);
    // To-Do: Get the id from route
    // To-Do: Go get the posts from database with route
    
    response.send(foundPost);
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

export {createPost, updatePost, deletePost, getPost, favoritePost};