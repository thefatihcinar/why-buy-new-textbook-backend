
/* Models */
import Post from "../models/postModel.js";
import User from '../models/userModel.js'
/* Utilities */
import { isEmpty } from '../utilities/emptiness.js'

class PostsService {

  static async createNewPost (post, user){
    /* this services creates a new post in the database with the given post and user */

    /* Create a new post in the database with the given post data */
    let createdPost = await Post.create(post); 
    /* Associate this post with the user who publishes it */
    await User.updateOne({_id: user._id}, { $push: { publishedPosts: createdPost._id } } );  

    return createdPost;

  }

  
}


export default PostsService;