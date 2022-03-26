/* Models */
import User from "../models/userModel.js";
/* Utilities */
import { isEmpty } from '../utilities/emptiness.js'
import Token from "../utilities/token.js";
import PostsService from "./postsService.js";


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
    
    if(isEmpty(email)) throw new Error("email is empty");

    let user = await User.findOne({email: email});

    if(isEmpty(user)) {
      return false;
    }
    else return true;
  }
}

class UsersService {

  static async registerNewUser(user){

    /* 1. Make sure there is not a registered user with this email */
    if(await UsersServiceHelper.doesUserExistByEmail(user.email)){
      /* it means that there is a registered user with this email */
      throw new Error("user already exists");
    }

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
    else if(!newUser){
      throw new Error("user could not be created");
    }
  }

  static async loginUser( { email , password }){
    /* this service is responsible for logging the user
       in other words, creates a new Bearer token */

    /* 1. First check the user in the database */
    const user = await User.findOne( { email: email } );

    /* Case 1: User exists and password is correct */
      /* Log In is Successful */
    if( user && await password === user.password){
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
    else if (inputUser){
        throw new Error("password is incorrect");
        return;
    }
    /* Case 3: User with this email does not exist */
    else {
        throw new Error("user not found");
        return;
    } 
  }

  static async deactivateUser(userID){
    /* this service deactivates an active user given with user id */

    /* Make sure user with this user id exists */
    if( !await UsersServiceHelper.doesUserExist(userID) ){
      throw new Error("user not found");
    }

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

    
  }

  static async updateUser(userID, user){
    /* this service updates the user with the given user id */

    // TO-DO: Implement this
  }

  static async updateUserProfilePicture(userID, imageURL){
    /* this service updates the profile picture of the user with the given user id 
       and given with the new profile picture image url */

    // TO-DO: Implement this

  }
}

export default UsersService;