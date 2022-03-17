import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        "name": { type: String, required: true },
        "surname": { type: String, required: true },
        "email": { type: String, required: true },
        "password": { type: String, required: true },
        "schoolName": { type: String },
        "city": { type: String },
        "phoneNumber": { type: String, required: true },
    },{ timestamps : true});

/* create User model from this schema */

const User = mongoose.model('User', userSchema);

export default User;