function createPost(request, response){

    // To-Do: Get the post information from json 
    // To-Do: Create post in database
    // To-Do: Return the posts

    response.send("post was added")
}

function updatePost(request, response){

    // To-Do: Get the product id from route
    // To-Do: Get the NEW POST INFORMATION from body 
    // To-Do: Go get the posts with the given id & update it 

    response.send("post was updated")
}

function deletePost(request, response){

    // To-Do: Get the id from route
    // To-Do: Get the post from database with given id 
    // To-Do: Delete this post from database

    response.send("post was deleted")
}

function getPost(request, response){

    // To-Do: Get the id from route
    // To-Do: Go get the posts from database with route

    response.send("single post")
}

function favoritePost(request, response){

    // To-Do: Get the post id from route
    // To-Do: Learn who connects from token/session
    // To-Do: Update post as favorite or unfavorite for the user

    response.send("Make post favorite")
}

export {createPost, updatePost, deletePost, getPost, favoritePost};