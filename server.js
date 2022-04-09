import dotenv from 'dotenv'
import express from 'express'
import colors from 'colors'
/* Utilities */
import connectDatabase from './configurations/database.js'
/* Routes */
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'
import formRoutes from './routes/formRoutes.js'
/* Middlewares */
import notFound from './middlewares/notFound.js'
import errorHandler from './middlewares/errorHandler.js'

/* Configure environment variables */
dotenv.config();

/* connect to the MongoDB first */
connectDatabase();

/* Configure Port */
const PORT = 5005;

export const app = express(); 

/* Set Up a Body Parser */
app.use(express.json()); 
/* JSON body must be in the form of an object */

/* Use Routes */
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/forms", formRoutes);

/* Not Found Middleware */
app.use(notFound);

/* Use Custom Error Handler Middleware */
app.use(errorHandler);

app.listen(process.env.PORT || PORT);

/* CREDENTIALS */