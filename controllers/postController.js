function addPost(request, response){

    // To-Do: Get the post information from json 
    // To-Do: Create post in database

    response.send("post was added")
}

function updatePost(request, response){

    // To-Do: Get the post information from json 
    // To-Do: Update database

    response.send("post was updated")
}

function deletePost(request, response){

    // To-Do: Get the post information from json 
    // To-Do: Delete this post from database

    response.send("post was deleted")
}

function getPost(request, response){

    // To-Do: Get the post from database

    response.send("single post")
}

function favoritePost(request, response){

    // To-Do: Get the post id from json
    // To-Do: Learn who connects from token/session
    // To-Do: Update post as favorite or unfavorite for the user

    response.send("Make post favorite")
}

export {addPost, updatePost, deletePost, getPost, favoritePost};