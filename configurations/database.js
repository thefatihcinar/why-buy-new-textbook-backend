/* In this will we will make database configurations 
to connect to the MongoDB database */

import mongoose from 'mongoose'

const CONNECTION_STRING = "";

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(CONNECTION_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true
  });
    /* here is means connection is successfully established */
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    /* if an error occurs while connecting to the database */
    console.error(`Error while connecting to the MongoDB: ${error.message}`)

    const FAILURE = 1
    process.exit(FAILURE)
  }
}

export default connectDatabase;