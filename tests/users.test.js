import request from 'supertest'

import { app } from '../server.js'

import * as fs from 'fs';
import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
    /* Connectors */
import connectDatabase from '../configurations/database.js'

    /* Models */
import Post from '../models/postModel.js'

// connectDatabase();

describe("RegisterinG a New User", () => {

  beforeEach(async () => {
      const posts = await Post.find({});
      console.log(posts.length);
  });
  
  describe("when unnecessary keys are provided, other than password, name, email and phoneNumber", () => {
      
      test("should respond the very post successfully", async () => {
          const response  = await request(app).get("/posts/623a40b6a3e499258cd28341").send();
          console.log("response", response);
          expect( response._body.price ).toBe(150)
      })

      
  })

  describe("when the name of the user is missing or not provided", () => {
      
    test("should respond not found 404", async () => {
        const response  = await request(app).get("/posts/613a40b6a3e499258cd28341").send();
        console.log("response", response);
        expect( response.statusCode ).toBe(404)
    })
  
  })

  describe("when the name of the user is missing or not provided", () => {
      
    test("should respond not found 404", async () => {
        const response  = await request(app).get("/posts/613a40b6a3e499258cd28341").send();
        console.log("response", response);
        expect( response.statusCode ).toBe(404)
    })
  
  })


})
