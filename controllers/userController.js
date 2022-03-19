import asyncHandler from 'express-async-handler'
import User from '../models/userModel,js';

// @desc    create new users
// @route   POST /users
// @access  private 
const registerUser = asyncHandler( async (request, response) => {

    // To-Do: Get the user information from json 
    // To-Do: Create user in database

    let registeredUser = await User.create(request.body);
    response.send(registeredUser)
})

const loginUser = asyncHandler( async (request, response) => {

    // To-Do: Get the user information from json 
    // To-Do: Get this user from database
    // To-Do: Check user email address and password

    response.send("login")
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