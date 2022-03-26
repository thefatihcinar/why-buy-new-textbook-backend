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

const getUserProfile = asyncHandler( async (request, response) => {

    try {
        let userID = request.user._id; /* get the id of the logged in user */
        let user = await UsersService.getUserProfile(userID);

        response.send(user);
        
    } catch (error) {
        /* If anything goes wrong, determine status code and re-throw the error */
        response.status(error.code);
        throw error;
    }
})

const updateUserProfile = asyncHandler( async (request, response) => {

    try {
        let updatedUser = await UsersService.updateUserProfile(request.body);

        response.send(updatedUser);
        
    } catch (error) {
        /* If anything goes wrong, determine status code and re-throw the error */
        response.status(error.code);
        throw error;
    }
})

export {registerUser, loginUser, getUserProfile, updateUserProfile};