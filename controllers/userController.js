import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
/* Services */
import UsersService from '../services/usersService.js';

/* Helpers */
import generateToken from '../utilities/generateToken.js';

// @desc    create new users
// @route   POST /users
// @access  private 
const registerUser = asyncHandler( async (request, response) => {

    // To-Do: Get the user information from json 
    // To-Do: Create user in database

    // Get user input
    let { name, email, password } = request.body;

    // Null check for input
    if (email === undefined || password === undefined || name === undefined ) {
      response.status(400).send("Email, password, name  must be provided");
    }

    // 1. Check if user already exists in the db
    let existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return response.status(409).send("User Already Exists. Please Login Again");
    }

    // 2. User does not exist, Create the user

    // Check whether email is valid or not
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if(!emailRegexp.test(email)) {
        response.status(400).send("Email is not in the right format")
        return;
    }

    // Create user in the database
    let user = await User.create({name, email, password});
    
    // Check if user has been created successfully
    if(user) {
        response.status(201);
        response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }

//     // Create token
//     const token = jwt.sign(
//       { user_id: user._id, email },
//       process.env.TOKEN_KEY,
//       {
//         expiresIn: "2h",
//       }
//     );
//     // save user token
//     user.token = token;

//     // return new user
//     res.status(201).json(user);
//   } catch (err) {
//     console.log(err);
//   }

})

const loginUser = asyncHandler( async (request, response) => {

    // To-Do: Get the user information from json 
    // To-Do: Get this user from database
    // To-Do: Check user email address and password
    let loggedInUser = await UsersService.loginUser(request.body)

    response.send(loggedInUser)
})

const logoutUser = asyncHandler( async (request, response) => {

    // To-Do: Remove session

    response.send("logged out")
})

const getUserProfile = asyncHandler( async (request, response) => {

    // To-Do: Learn who connects from token/session
    // To-Do: Get the user from database

    response.send("your user profile")
})

const updateUserProfile = asyncHandler( async (request, response) => {

    // To-Do: Get the user information from json 
    // To-Do: Learn who connects from token/session
    // To-Do: Update database

    response.send("updated profile")
})

export {registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile};