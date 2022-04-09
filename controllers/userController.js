import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes';
/* Services */
import { UsersService } from '../services/usersService.js';


// @desc    create new users
// @route   POST /users
// @access  private 
const registerUser = asyncHandler( async (request, response) => {

    let registeredUser = await UsersService.registerNewUser(request.body)

    response.send(registeredUser)

})

const loginUser = asyncHandler( async (request, response) => {

    let loggedInUser = await UsersService.loginUser(request.body)
        
    response.send(loggedInUser)
    
})

const getUserProfile = asyncHandler( async (request, response) => {

    let userID = request.user._id; /* get the id of the logged in user */
    let user = await UsersService.getUserProfile(userID);

    response.send(user);
})

const updateUserProfile = asyncHandler( async (request, response) => {

    let updatedUser = await UsersService.updateUser(request.user._id, request.body);

    response.send(updatedUser);
})

export {registerUser, loginUser, getUserProfile, updateUserProfile};