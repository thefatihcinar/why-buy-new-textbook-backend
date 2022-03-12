import express from 'express'
import colors from 'colors'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'
import connectDatabase from './configurations/database.js'

/* connect to the MongoDB first */
connectDatabase();

const app = express(); 

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.listen(5005);