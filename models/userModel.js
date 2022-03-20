import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        "name": { type: String, required: true },
        "email": { type: String, required: true, unique: true },
        "password": { type: String, required: true },
        "phoneNumber": { type: String, required: true },
        "profilePicture": { type: String, default: "" },
        "publishedPosts": [ { type: mongoose.Schema.Types.ObjectId, ref: 'Post' } ],
        "starredPosts": [ { type: mongoose.Schema.Types.ObjectId, ref: 'Post' } ],
        "recommendedPosts": [ { type: mongoose.Schema.Types.ObjectId, ref: 'Post' } ],
        "isActive": { type: Boolean, default: true },
        "isEmailVerified": { type: Boolean, default: false }
    },{ timestamps : true});

/* create User model from this schema */

const User = mongoose.model('User', userSchema);

export default User;