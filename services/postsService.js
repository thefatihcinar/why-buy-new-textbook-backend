
/* Models */
import Post from "../models/postModel.js";
import User from '../models/userModel.js'
/* Utilities */
import { isEmpty } from '../utilities/emptiness.js'
import ConfigurationInjector from '../utilities/configurationInjection.js'
/* Helpers */
import { UsersServiceHelper } from './usersService.js'
/* Messages */
import msg from '../messages/postMessages.js'

class PostsServiceHelper {

  static async doesPostExist(postID) {
    /* this method make sures that the requested post is existing
       in the database, otherwise it returns false */
    let post = await Post.findById(postID);
    if (isEmpty(post)) {
      return false;
    }
    else return post;
  }

  static async assertPostExists(postID) {
    /* this method makes sure that the post exists in the database
       and if not it throws an error */

    if( !await PostsServiceHelper.doesPostExist(postID) ){
      const error = new Error();
      error.message = msg.POST_NOT_FOUND;
      error.code = StatusCodes.NOT_FOUND;
      throw error;
    }
  }
}

class PostsService {

  static async createNewPost (post, user){
    /* this services creates a new post in the database with the given post and user */

    /* Create a new post in the database with the given post data */
    let createdPost = await Post.create(post); 

    if( !createdPost ){
      throw new Error(msg.POST_NOT_CREATED);
    }
    
    /* Associate this post with the user who publishes it */
    await User.updateOne({_id: user._id}, { $addToSet: { publishedPosts: createdPost._id } } );  

    return createdPost;

  }

  static async searchPost(queryString){
    /* this service searches for posts with the given query string, no pagination and no filtering is done
       pure search */

    /* the search operation is done both in the title, author and in the description of the post */

    if(!queryString) queryString = ""; // if no query string is provided, set it to an empty string

    const result = await Post.find( { $or: 
                                        [ 
                                          { title: { $regex: queryString, $options: 'i' } }, 
                                          { author: { $regex: queryString, $options: 'i' } },
                                          { description: { $regex: queryString, $options: 'i' } }
                                        ] 
                                    });
    return result;
  }

  static async searchAndFilterPosts(queryString, filters, page = 1){
    /* this service searches for posts with given search/filtering parameters as well as pagination */

    /* this search service searches for posts in both post titles, description and author */

    /* Get the pagination configuration from global configuration system */
    const cfg = new ConfigurationInjector();
    const pageLimit = cfg.getConfig('PAGE_SIZE');

    /* FILTERING */
    /*
        Here are some filters
        1. CityID
        2. Type
        3. Condition
        4. InstitutionID
    */  
    
    if(!filters) filters = {};

    const result = await Post.find( { 
                                      $or: 
                                        [ 
                                          { title: { $regex: queryString, $options: 'i' } }, 
                                          { author: { $regex: queryString, $options: 'i' } },
                                          { description: { $regex: queryString, $options: 'i' } }
                                        ],
                                      $and: [
                                        filters      
                                      ] 
                                    })
                                    .skip( (page - 1) * pageLimit)
                                    .limit(pageLimit);
    return result;

  }
  

  static async getPostByID(postID){
    /* this services gets a post by its ID */

    await PostsServiceHelper.assertPostExists(postID);

    let post = await Post.findById(postID);

    return post;
  }

  static async getPostsByUserID(userID){
    /* this service gets all the posts that are published by the given user id */

    /* first check whether there is such user with the given user id */
    await UsersServiceHelper.assertUserExists(userID);

    let postsOfThisUser = await Post.find({seller: userID});

    return postsOfThisUser;
  }

  static async getStarredPostsByUserID(userID){
    /* this service gets all the posts that are starred by the given user id */

     /* first check whether there is such user with the given user id */
     await UsersServiceHelper.assertUserExists(userID);

     let starredPostsOfThisUser = user.starredPosts;
 
     return starredPostsOfThisUser;
  }

  static async deletePost(postID, deleteConfigurations){
    /* this service deletes the post with the given post id */

    await PostsServiceHelper.assertPostExists(postID);

    if(deleteConfigurations.softDelete === true){
      /* this means make a soft delete of this object, i.e. mark as deleted but do not delete actually */
      let deletedPost = await Post.updateOne({_id: postID}, { $set: { isDeleted: true } } , { new: true });

      return deletedPost;
    }
    else if(deleteConfigurations.hardDelete === true){
      /* this means make a hard delete of this object */
      let deletedPost = await Post.deleteById(postID);

      return deletedPost;
      /* break down its relation with user as well */

    }
    else{
      throw new Error("delete configuration must be provided");
    }
    
  }

  static async updatePost(postID, postInformation){
    /* this service updates the post with the given post id */
    
    await PostsServiceHelper.assertPostExists(postID);

    /* update this post */
    let updatedPost = await Post.updateOne({_id: postID}, { $set: postInformation } , { new: true });

    return updatedPost;

  }

  static async addImageToPost(postID, imageURL){
    /* this service adds an image to the post with the given post id */

    await PostsServiceHelper.assertPostExists(postID);
    
    // TO-DO: Implement this
  }

  static async starPost(postID, userID){
    /* this service stars the post with the given post id by the given user id */

    /* check this user id and post id is valid */
    await PostsServiceHelper.assertPostExists(postID);
    await UsersServiceHelper.assertUserExists(userID);

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
      let updatedUser = await User.updateOne({_id: userID}, { $addToSet: { starredPosts: postID } } , { new: true });
      return updatedUser;
    }
  }


  static async markPostAsSold(postID){
    /* this service marks the post with the given post id as sold */

    /* first check whether this post is existing or not */
    await PostsServiceHelper.assertPostExists(postID);

    /* mark this post as sold */
    let updatedPost = await Post.updateOne({_id: postID}, { $set: { isSold: true } } , { new: true });

    return updatedPost;

  }

  static async getNewestPosts(all = false){
    /* this service brings the newest posts published in the system */

    if( all === true ) {
      /* this means that we want to bring all the newest posts */
      let newestPosts = await Post.find( { isDeleted: false } ).sort( { createdAt: -1 } ); /* sort by createdAt in descending order */
      return newestPosts;
    }

    /* get the pagination configuration from global configuration system */
    const cfg = new ConfigurationInjector();
    const pageLimit = cfg.getConfig('PAGE_SIZE');

    
    const newestPosts = await Post.find({ isDeleted: false }).sort( { createdAt: -1 } ).limit(pageLimit);
    return newestPosts;
  }

  static async ressurrectPost(postID){
    /* this service resurrects the post with the given post id 
       in other words, it brings the post back that is softly deleted */

    await PostsServiceHelper.assertPostExists(postID);

    /* resurrect this post */
    let resurrectedPost = await Post.updateOne({_id: postID}, { $set: { isDeleted: false } } , { new: true });

    return resurrectedPost;
  }
  
}


export default PostsService;