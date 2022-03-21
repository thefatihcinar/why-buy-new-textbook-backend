
/* Models */
import Post from "../models/postModel.js";
import User from '../models/userModel.js'
/* Utilities */
import { isEmpty } from '../utilities/emptiness.js'

/* Configurations */
const pageSize = 16;

class PostsService {

  static async createNewPost (post, user){
    /* this services creates a new post in the database with the given post and user */

    /* Create a new post in the database with the given post data */
    let createdPost = await Post.create(post); 
    /* Associate this post with the user who publishes it */
    await User.updateOne({_id: user._id}, { $push: { publishedPosts: createdPost._id } } );  

    return createdPost;

  }

  static async searchPost(searchParameters){
    /* this service searches for posts with given search/filtering parameters */

    // TO-DO: Implement service
  }

  static async getPostByID(postID){
    /* this services gets a post by its ID */

    if(isEmpty(postID)){
      throw new Error("PostID must be provided");
    }

    let post = await Post.findById(postID);

    return post;
  }

  static async getPostsByUserID(userID){
    /* this service gets all the posts that are published by the given user id */

    /* first check whether there is such user with the given user id */
    let user = await User.findById(userID);

    if(!user){
      // if there is not such a user, do not get posts of him
      throw new Error("There is no user with the given user id");
    }

    let postsOfThisUser = await Post.find({seller: userID});

    return postsOfThisUser;
  }

  static async getStarredPostsByUserID(userID){
    /* this service gets all the posts that are starred by the given user id */

    // TO-DO: Implement this
  }

  static async deletePost(postID){
    /* this service deletes the post with the given post id */

    // TO-DO: Implement this
  }

  static async updatePost(postID, post){
    /* this service updates the post with the given post id */

    // TO-DO: Implement this
  }

  static async addImageToPost(postID, imageURL){
    /* this service adds an image to the post with the given post id */

    // TO-DO: Implement this
  }

  static async starPost(postID, userID){
    /* this service stars the post with the given post id by the given user id */

    // TO-DO: Implement this
  }

  static async markPostAsSold(postID){
    /* this service marks the post with the given post id as sold */

    // TO-DO: Implement this
  }

  static async newestPosts(){
    /* this service brings the newest posts published in the system */
    
    // TO-DO: Implement this
  }
  
}


export default PostsService;