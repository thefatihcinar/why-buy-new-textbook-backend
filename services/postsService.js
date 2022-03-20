
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

  static async getPostByID(postID){
    /* this services gets a post by its ID */

    if(isEmpty(postID)){
      throw new Error("PostID must be provided");
    }

    let post = await Post.findById(postID);

    return post;
  }
}


export default PostsService;