import dotenv from 'dotenv'
import express from 'express'
import colors from 'colors'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'
import connectDatabase from './configurations/database.js'

/* Configure environment variables */
dotenv.config();

/* connect to the MongoDB first */
connectDatabase();

const app = express(); 

/* Set Up a Body Parser */
app.use(express.json()); 
/* JSON body must be in the form of an object */


app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.listen(5005);