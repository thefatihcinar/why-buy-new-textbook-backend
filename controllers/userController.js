import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
/* Services */
import UsersService from '../services/usersService.js';


// @desc    create new users
// @route   POST /users
// @access  private 
const registerUser = asyncHandler( async (request, response) => {

    try {
        let registeredUser = await UsersService.registerNewUser(request.body)

        response.send(registeredUser)
    } catch (error) {
        /* If anything goes wrong, determine status code and re-throw the error */
        response.status(error.code);
        throw error;
    }
})

const loginUser = asyncHandler( async (request, response) => {

    try {
        let loggedInUser = await UsersService.loginUser(request.body)
        
        response.send(loggedInUser)
    } catch (error) {
        /* If anything goes wrong, determine status code and re-throw the error */
        response.status(error.code);
        throw error;
    }
    
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