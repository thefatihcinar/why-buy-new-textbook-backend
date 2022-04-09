/* Models */
import Post from "../models/postModel.js";
import User from '../models/userModel.js'
/* Utilities */
import { isEmpty } from '../utilities/emptiness.js'
import ConfigurationInjector from '../utilities/configurationInjection.js'
/* Services */
import PostsService from "./postsService.js";
import { UsersServiceHelper } from "./usersService.js";

import faker from 'faker';

class RecommendationService {
  
  static async associateRecommendationsWithUser(searchQueryString, userID){
    /* whenever a user searches for a post, this service associates the results of the search with the user */

    /* Controls */
    await UsersServiceHelper.assertUserExists(userID);
    if( isEmpty(searchQueryString) ) return false;

    const searchResults = await PostsService.searchPost(searchQueryString);
    /* without any pagination or filtering */

    // Associate the results with the user
    // in other words, make pre-computation, store all the search result in the user's future recommendations
    await User.findOneAndUpdate({ _id: userID }, { $addToSet: { recommendedPosts: searchResults } } );

    return true;
  }
}

export default RecommendationService;