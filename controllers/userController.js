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
    let registeredUser = await UsersService.registerNewUser(request.body)

    response.send(registeredUser)
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