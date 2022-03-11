import express from 'express'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express(); 

// initially we are going to use the static middleware
// PUT /posts/3/star

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.listen(5005);