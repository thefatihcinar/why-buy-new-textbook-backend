

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
  
  

  static async recommendedPostsBasedOnInstituion(institutionID){
    /* this service brings the recommended posts for a user with the given institution id */

    // TO-DO: Implement this
  }

  static async setFutureRecommendationsForUser(userID, postIDs){
    /* this service gets an array of post ids and a user id and set future recommendations 
       of a user (pre-computation) */

    // TO-DO: Implement this
  }
}

export default RecommendationService;