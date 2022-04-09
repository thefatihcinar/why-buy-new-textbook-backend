import { response } from "express";

/* Overriding the custom error handling middleware 
    this should be the last one at the request pipeline
    because when there is an error happened in a controller it should fall here */
const errorHandler = (error, request, response, next) => {
  /* the custom error handler middleware, responsible for when there is an error */
  /* decide the status code */
  let statusCode = response.statusCode === 200  ? 500 : ( error.code || response.statusCode ) ; 
  /* make 20x status code to be 500, because this is an error handler middleware
     there must be an error */
  response.status(statusCode);

  // return the error
  response.json({
    message: error.message,
    stack: process.env.NODE_ENV == 'production' ? null : error.stack
  })
}

export default errorHandler;

