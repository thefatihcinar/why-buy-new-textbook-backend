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

  static async recommendedPostsForUser(userID, recommendationPlace = 'MAIN_PAGE', all = false){
    /* this service brings the recommended posts for a specific user given with user id */

    /* The recommended posts might be fetched from different places 
       one example is main page, the other example is banner, 
       different places require different amount of recommendations */

    /* Controls */
    await UsersServiceHelper.assertUserExists(userID);

    if(all === true) {
      /* if all of the recommended posts are required, we return all of them */
      const recommendedPosts = await User.findById(userID).select('recommendedPosts');
    }
    else {
      /* this means limit the amount of recommended posts to the amount of recommendations required */

      /* Get the pagination configuration from global configuration system */
      const cfg = new ConfigurationInjector();

      let recommendationPlaceSelector; /* this variable will store where the recommendation will take place, in the main page or in the banner */
      if(recommendationPlace === 'MAIN_PAGE') recommendationPlaceSelector = 'PAGE_SIZE'
      else if(recommendationPlace === 'BANNER') recommendationPlaceSelector = 'BANNER_RECOMMENDATION_SIZE';

      const numberofPostsShown = cfg.getConfig(recommendationPlaceSelector);

      const allRecommendedPosts = (await User.findById(userID).select('recommendedPosts').populate('recommendedPosts')).recommendedPosts;

      let recommendedPosts = [];

      /* if the number of recommended posts is less than the number of posts shown, 
         or if there is simply no recommended posts (meaning the user has never performed a search in the system),
         we enhance the recommended posts with the newest posts */
      if( numberofPostsShown > allRecommendedPosts.length ){
        
        /* calculate the difference */
        const difference = numberofPostsShown - allRecommendedPosts.length;

        /* as this many elements from the newest posts */
        const newestPosts = await Post.find( { isDeleted: false } ).sort( { createdAt: -1 } ).limit(difference);

        /* add the newest posts to the recommended posts as well as recommended posts */
        recommendedPosts = [...allRecommendedPosts, ...newestPosts];

        /* after this step, no further action is required */
        return recommendedPosts;
      }
      
      /* In the scenerio, where the number of recommended posts is greater than the number of posts shown */
      /* Choose randomly the posts that will be shown with the amount of posts that need to be shown */
      for(let i = 0; i < numberofPostsShown; i++){
        /* choose a random post from the recommended posts */
        let randomPost = faker.random.arrayElement(allRecommendedPosts);

        /* if it is not already in the recommended posts, add it to the recommended posts */
        if( !recommendedPosts.includes(randomPost) ) recommendedPosts.push(randomPost);
        else i--;
        /* if the random post is already in the recommended posts, choose another one, i.e. keep iteration */
      }

      return recommendedPosts;
    }
  }
  
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