import Post from "../models/postModel.js"

let counter = 0;

async function createPost(request, response){

    // To-Do: Get the post information from json 
    // To-Do: Create post in database
    // To-Do: Return the posts
    
    let yarattigimUrun = await Post.create(request.body)


    response.send(yarattigimUrun)
}

// PUT /posts/:id/images  => add an image to images of the post
async function addImagetoPost(request, response){
        // To-Do : Get the images file
        // To-Do: Upload Image to AWS S3
        // To-Do: Get Post Id from route
        // To-Do: Insert image url into images array
        
    
        response.send("Add image to post")
}

async function updatePost(request, response){

    // To-Do: Get the product id from route
    // To-Do: Get the NEW POST INFORMATION from body 
    // To-Do: Go get the posts with the given id & update it 
    let updatedPost = await Post.findByIdAndUpdate(request.params.id, request.body, { new : true }) 
    response.send(updatedPost)
}

async function deletePost(request, response){

    // To-Do: Get the id from route
    // To-Do: Get the post from database with given id 
    let deletedPost = await Post.findByIdAndDelete(request.params.id);
    // To-Do: Delete this post from database

    response.send("post was deleted")
}

async function getPost(request, response){

    console.log(request.params.id);

    let bulunanSonuc = await Post.findById(request.params.id);

    // To-Do: Get the id from route
    // To-Do: Go get the posts from database with route

    response.send(bulunanSonuc);
}

function favoritePost(request, response){

    // To-Do: Get the post id from route
    // To-Do: Learn who connects from token/session
    // To-Do: Update post as favorite or unfavorite for the user

    response.send("Make post favorite")
}

export {createPost, updatePost, deletePost, getPost, favoritePost};