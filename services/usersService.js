
/* Models */
import User from "../models/userModel.js";
/* Utilities */
import { isEmpty } from '../utilities/emptiness.js'
import Token from "../utilities/token.js";

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

class UsersService{

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

  static async loginUser(user){
    /* this service is responsible for logging the user into existing account*/
    
    let email = user.email, password = user.password;
   
    // Null Check for the email and password
    if(email === undefined || password === undefined) {
        throw new Error("email and password must be provided");
        return;
    }

    // Go find the user in the db
    const inputUser = await User.findOne({ email: email });

    if(inputUser && await password === inputUser.password){
        // user is authenticated
        let loggedInUserJSON = {
            _id: inputUser._id,
            name: inputUser.name,
            email: inputUser.email,
            token: Token.generateBearerToken(inputUser._id)
        }
        return loggedInUserJSON;
    }
    else if (inputUser){
        // user exists but password is incorrent
        throw new Error("password is incorrect");
        return;
    }
    else {
        // the user does not exist
        throw new Error("user not found");
        return;
    } 
  }

  static async deactivateUser(userID){
    /* this service deactivates an active user given with user id */

    // TO-DO: Implement this
  }

  
  static async activateUser(userID){
    /* this service reactivates an inactive user given with user id */

    // TO-DO: Implement this
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