import express from 'express'
import postRoutes from './routes/postRoutes.js'

const app = express(); 


// PUT /posts/3/star

app.use("/posts", postRoutes);

app.listen(5005);