import request from 'supertest'

import { app } from '../server.js'

/* Utilities */
import valideObjectKeys from './helpers/valideObjectKeys.js'

import * as fs from 'fs';
import jwtDecode from 'jwt-decode';

import colors from 'colors'
import dotenv from 'dotenv'
dotenv.config();

    /* Connectors */
import mongoose from 'mongoose'
import connectDatabase from '../configurations/database.js'

    /* Models */
import Post from '../models/postModel.js'


describe("User Login", () => {

  describe("when valid credentials for login is provided", () => {

    test("should respond with appropiate values", () => {});

    test("should respond with a valid JWT token", () => {});

    test("should respond with a token that has valid issue and expiration dates", () => {});

    test("should response a JWT Token which has all the appropiate information", () => {});
  });

  describe("when a valid and existing email adress is provided but password is wrong", () => {

      test("should respond with a 400 BAD_REQUEST status code", () => {});

  });

  describe("email", () => {

    describe("when a non-email is provided for email", () => {

      test("should respond with a 400 BAD_REQUEST status code", () => {});
    });

    describe("when a non-existing email address is provided", () => {
        
      test("should respond with a 400 BAD_REQUEST status code", () => {});
    });
  
  });

  describe("when the request has garbage keys, regardless of email and password", () => {

      test("should respond with a 400 BAD_REQUEST status code", () => {});
  });

})


describe("User Registration", () => {

  describe("when valid credentials for registeration is provided", () => {

    test("should create the user correctly with given parameters", () => {});

    test("should respond with HTTP 201 Created ", () => {});

    test("should respond with a valid JWT token", () => {});

    test("should response a JWT Token which has all the appropiate information", () => {});

  });

  describe("when the email of the user is already registered", () => {
      
      test("should respond with HTTP 409 Conflict", () => {});
  });

  describe("email", () => {

    describe("when the email of the user is missing or not provided", () => {

      test("should respond with HTTP 400 BAD_REQUEST", () => {});
    });

    describe("when a non-email is provided for email", () => {
        
        test("should respond with HTTP 400 BAD_REQUEST", () => {});
    });
  
  });

  describe("password", () => {

    describe("when the password of the user is missing or not provided", () => {});

    describe("when the password of the user does not obey the regular expression", () => {});

    describe("when the password of the user is less than 8 chars", () => {});

    describe("when the password of the user is more than 50 chars", () => {});


  
  });

  describe("phone number", () => {

    describe("when the phoneNumber of the user is missing or not provided", () => {});

    describe("when an invalid phone number is provided", () => {});
  
  });

  describe("name of the user", () => {

    describe("when the name of the user is missing or not provided", () => {});
    
    describe("when the name of the user is provided as a number", () => {});


  });

  describe("when the user provides isActive information where he/she should not", () => {
        
      test("should respond with HTTP 400 BAD_REQUEST", () => {});

      test("should not change the isActive data of the user", () => {});
  });

  describe("when the user provides isEmailVerified information where he/she should not", () => {
        
    test("should respond with HTTP 400 BAD_REQUEST", () => {});

    test("should not change the isMailVerified data of the user", () => {});

  });

  describe("when the user provides publishedPosts information where he/she should not", () => {
        
    test("should respond with HTTP 400 BAD_REQUEST", () => {});

    test("should not change the publishedPosts of the user", () => {});

  });

  describe("when the user provides starredPosts information where he/she should not", () => {
        
    test("should respond with HTTP 400 BAD_REQUEST", () => {});

    test("should not change the starredPosts of the user", () => {});

  });

  describe("when the user provides recommendedPosts information where he/she should not", () => {
        
    test("should respond with HTTP 400 BAD_REQUEST", () => {});

    test("should not change the recommendedPosts of the user", () => {});
  });

  describe("when the user wants to assign new profile picture directly as URL", () => {
        
    test("should respond with HTTP 400 BAD_REQUEST", () => {});

    test("should not change the URL of the user's profile picture", () => {});
    
  });

  describe("when the request has garbage keys, regardless of email and password", () => {});

});

describe("User Update Profile", () => {});