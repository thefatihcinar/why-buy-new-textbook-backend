import { StatusCodes } from 'http-status-codes';
/* Models */
import User from "../models/userModel.js";
/* Utilities */
import { isEmpty } from '../utilities/emptiness.js'
import Token from "../utilities/token.js";
import PostsService from "./postsService.js";
/* Messages */
import msg from '../messages/userMessages.js'


class UsersServiceHelper {

  static async doesUserExist(userId) {
    /* this method make sures that the requested user is existing
       in the database, otherwise it returns false */
    let user = await User.findById(userId);
    if (isEmpty(user)) {
      return false;
    }
    else return user;
  }

  static async doesUserExistByEmail(email) {
    /* this method computes whether this user exists in the database
        or not based on the email provided */

    let user = await User.findOne({email: email});

    if(isEmpty(user)) {
      return false;
    }
    else return true;
  }

  static async assertUserExists(userID) {
    /* this method makes sure that the user exists in the database
       and if not it throws an error */

    if( !await UsersServiceHelper.doesUserExist(userID) ){
      const error = new Error();
      error.message = msg.USER_NOT_FOUND;
      error.code = StatusCodes.NOT_FOUND;
      throw error;
    }
  }

  static async assertUserNotExists(email) {
    /* this method makes sure that the user DOES NOT exist in the database
       and if exists, it throws an error */

    if(await UsersServiceHelper.doesUserExistByEmail(email)){
      /* it means that there is a registered user with this email */
      const error = new Error();
        error.message = msg.EMAIL_IS_ALREADY_IN_USE;
        error.code = StatusCodes.CONFLICT;
      throw error;
    }
  }
}

class UsersService {

  static async registerNewUser(user){

    /* 1. Make sure there is not a registered user with this email */
    await UsersServiceHelper.assertUserNotExists(user.email);

    /* Validations are removed because they are now done by express
      validator middlewares */
 
    /* 2. If User does not exist, create new user */
    let newUser = await User.create(user);

    /* 3. Return the created user */
      /* Also check whether it is created successfully or not */
    if(newUser){ 
      let registeredUser = {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          token: Token.generateBearerToken(newUser._id)
      }; 

      return registeredUser;
    }
    else if( !newUser ){
      const error = new Error();
        error.message = msg.USER_NOT_CREATED;
        error.code = StatusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }
  }

  static async loginUser( { email , password }){
    /* this service is responsible for logging the user
       in other words, creates a new Bearer token */

    /* 1. First check the user in the database */
    const user = await User.findOne( { email: email } );

    /* Case 1: User exists and password is correct */
      /* Log In is Successful */
    if( user && await user.matchPassword(password)){
        /* the user is successfully authenticated */
        let loggedInUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: Token.generateBearerToken(user._id)
        }
        return loggedInUser;
    }
    /* Case 2: User exits but password is incorrect */
    else if (user){
      const error = new Error();
        error.message = msg.PASSWORD_INCORRECT;
        error.code = StatusCodes.BAD_REQUEST;
      throw error;
    }
    /* Case 3: User with this email does not exist */
    else {
        const error = new Error();
          error.message = msg.USER_NOT_FOUND;
          error.code = StatusCodes.NOT_FOUND;
        throw error;
    } 
  }

  static async deactivateUser(userID){
    /* this service deactivates an active user given with user id */

    /* Make sure user with this user id exists */
    await UsersServiceHelper.assertUserExists(userID);

    let deactivated = await User.findByIdAndUpdate(userID, { isActive: false }, { new: true });
    
    /* Additionally, make a soft delete of the user's posts */

    let usersPosts = await PostsService.getPostsByUserID(userID);

    for (post of usersPosts){
      await PostsService.deletePost(post._id, { softDelete: true, hardDelete: false });
    }

    return deactivated;
  }

  
  static async activateUser(userID){
    /* this service reactivates an inactive user given with user id */

    /* Make sure user with this user id exists */
    await UsersServiceHelper.assertUserExists(userID);
    
    let activated = await User.findByIdAndUpdate(userID, { isActive: true }, { new: true });

    /* resurrect this users soflt-deleted posts */
    let usersPosts = await PostsService.getPostsByUserID(userID);
    
    for(post of usersPosts){
      await PostsService.ressurrectPost(post._id);
    }

    return activated;
    
  }

  static async updateUser(userID, user){
    /* this service updates the user with the given user id */

    /* Make sure user with this user id exists */
    await UsersServiceHelper.assertUserExists(userID);

    /* Update the user */
    let updatedUser = await User.findByIdAndUpdate(userID, user, { new: true });

    return updatedUser;

  }

  static async updateUserProfilePicture(userID, newProfilePictureURL){
    /* this service updates the profile picture of the user with the given user id 
       and given with the new profile picture image url */

    /* Make sure user with this user id exists */
    await UsersServiceHelper.assertUserExists(userID);

    /* Update the user's profile picture */
    let user = await User.findByIdAndUpdate(userID, { profilePictureURL: newProfilePictureURL }, { new: true });

    return user;

  }
}

export { UsersService, UsersServiceHelper };