
/* Models */
import User from "../models/userModel.js";
/* Utilities */
import { isEmpty } from '../utilities/emptiness.js'
import emailValidator from "../utilities/emailValidation.js";

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

  static async deactivateUser(userID){
    /* this service deactivates an active user given with user id */

    // TO-DO: Implement this
  }

}