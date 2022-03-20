import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        "name": { type: String, required: true },
        "email": { type: String, required: true, unique: true },
        "password": { type: String, required: true },
        "publishedPosts": [ { type: mongoose.Schema.Types.ObjectId, ref: 'Post' } ],
    },{ timestamps : true});

/* create User model from this schema */

const User = mongoose.model('User', userSchema);

export default User;