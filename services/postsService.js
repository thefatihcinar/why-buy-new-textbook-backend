
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

     /* first check whether there is such user with the given user id */
     let user = await User.findById(userID);

     if(!user){
       // if there is not such a user, do not get starred posts of him
       throw new Error("There is no user with the given user id");
     }

     let starredPostsOfThisUser = user.starredPosts;
 
     return starredPostsOfThisUser;
  }

  static async deletePost(postID, deleteConfigurations){
    /* this service deletes the post with the given post id */

    if(deleteConfigurations.softDelete === true){
      /* this means make a soft delete of this object, i.e. mark as deleted but do not delete actually */
      let deletedPost = await Post.updateOne({_id: postID}, { $set: { isDeleted: true } } , { new: true });

      return deletedPost;
    }
    else if(deleteConfigurations.hardDelete === true){
      /* this means make a hard delete of this object */
      let deletedPost = await Post.deleteById(postID);

      /* remove this post id form the published posts of the seller */
      await User.updateOne({_id: deletedPost.seller}, { $pull: { publishedPosts: postID } } );

      /* remove this post id from the starred posts of the seller */
      await User.updateOne({_id: deletedPost.seller}, { $pull: { starredPosts: postID } } );

      /* remove this post id from the recommended posts of the seller */
      await User.updateOne({_id: deletedPost.seller}, { $pull: { recommendedPosts: postID } } );

      // To Do: Delete this references from all other users

      return deletedPost;
      /* break down its relation with user as well */

    }
    else{
      throw new Error("delete configuration must be provided");
    }
    
  }

  static async updatePost(postID, postInformation){
    /* this service updates the post with the given post id */

    /* make sure this post is existing */
    let post = await Post.findById(postID);

    if(!post){
      throw new Error("post not found");
      return;
    }

    /* update this post */
    let updatedPost = await Post.updateOne({_id: postID}, { $set: postInformation } , { new: true });

    return updatedPost;

  }

  static async addImageToPost(postID, imageURL){
    /* this service adds an image to the post with the given post id */

    // TO-DO: Implement this
  }

  static async starPost(postID, userID){
    /* this service stars the post with the given post id by the given user id */

    /* check this user id and post id is valid */
    let user = await User.findById(userID);
    let post = await Post.findById(postID);

    if(!user || !post){
      // if neither this user nor this post is existing, do not star this post and throw an error
      throw new Error("user and post must be existing");
      return;
    }

    /* check whether this post is already starred by this user */
    let isAlreadyStarred = await user.starredPosts.includes(postID);
    if(isAlreadyStarred){
      // if this post is already starred by this user, unstar the post
      let updatedUser = await User.updateOne({_id: userID}, { $pull: { starredPosts: postID } } ,  { new: true });
      return updatedUser;
    }
    else {
      /* this means that this user has not starred this post yet */

      /* star this post */
      let updatedUser = await User.updateOne({_id: userID}, { $push: { starredPosts: postID } } , { new: true });
      return updatedUser;
    }
  }


  static async markPostAsSold(postID){
    /* this service marks the post with the given post id as sold */

    /* first check whether this post is existing or not */
    let post = await Post.findById(postID);

    if(!post){
      throw new Error("post not found to mark as sold");
      return;
    }

    /* mark this post as sold */
    let updatedPost = await Post.updateOne({_id: postID}, { $set: { isSold: true } } , { new: true });

    return updatedPost;

  }

  static async newestPosts(){
    /* this service brings the newest posts published in the system */
    
    // TO-DO: Implement this
  }
  
}


export default PostsService;