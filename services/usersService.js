
/* Models */
import User from "../models/userModel.js";
/* Utilities */
import { isEmpty } from '../utilities/emptiness.js'
import emailValidator from "../utilities/emailValidation.js";
import generateToken from '../utilities/generateToken.js';

class UsersService{

  static async registerNewUser(user){

    /* Initial Validations */
    /* Make sure none of them is empty */

    /* this code block makes sure that none of the fields are empty */

    for(let key in user){

      let value =  user[key]; // get the value for this key of this user

      if(isEmpty(value)) {
        throw new Error(`${key} cannot be empty`);
        break;
      }
    }

    /* EMail Validation */
    if (!emailValidator(user.email)){
      // if the email is not verified
      throw new Error("Email is not in the right format");
    }
    
    /* Check whether this user already exists or not */

    let existingUser = await User.findOne( { email: email } );

    if (existingUser) {
      throw new Error("User Already Exists");
      return;
    }

    /* Create the user */


      
    
  }

  static async loginExistingUser(user){
    /* this service is responsible for logging the user into existing account*/
    
    let email = user.email, password = user.password;
   
    // Null Check for the email and password
    if(email === undefined || password === undefined) {
        throw new Error("email and password must be provided");
        return;
    }

    // Go find the user in the db
    const existingUser = await User.findOne({ email: email });

    if(existingUser && await existingUser.matchPassword(password)){
        // user is authenticated
        response.json({
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin,
            token: generateToken(existingUser._id)
        });
    }
    else if (existingUser){
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