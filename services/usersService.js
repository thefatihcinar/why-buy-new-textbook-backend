
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

    // Get user input
    let name = user.name, email = user.email, password = user.password;

    for(let key in user){

      let value =  user[key]; // get the value for this key of this user

      if(isEmpty(value)) {
        throw new Error(`${key} cannot be empty`);
        break;
      }
    }

    // Null check for input
    if (email === undefined || password === undefined || name === undefined ) {
      throw new Error("Email, password, name  must be provided");
      return;
    }

    /* EMail Validation */
    if (!emailValidator(email)){
      // Check whether email is valid or not, if the email is not verified
      throw new Error("Email is not in the right format");
      return;
    }
 
    // 1. Check if user already exists or not
    let existingUser = await User.findOne({ email: email });
 
    if (existingUser) {
      throw new Error("User Already Exists");
      return;
    }
 
    // 2. User does not exist, Create the user
    let newUser = await User.create({name, email, password});
     
    // Check if user has been created successfully
    if(user) {
        response.status(201);
        response.json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        }) 
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

    if(inputUser && await inputUser.matchPassword(password)){
        // user is authenticated
        response.json({
            _id: inputUser._id,
            name: inputUser.name,
            email: inputUser.email,
            token: generateToken(inputUser._id)
        });
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