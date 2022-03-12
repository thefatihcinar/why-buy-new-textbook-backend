import express from 'express'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express(); 

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.listen(5005);