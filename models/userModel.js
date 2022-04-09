import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
/* Utilities */
import ConfigurationInjector from '../utilities/configurationInjection.js'

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


userSchema.methods.matchPassword = async function(enteredPassword){
    /* this method will compare the entered password with the password of the user
       of course the hashed version */
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.hashPassword = async function(password){
    /* this method hashes a plain password */

    const cfg = new ConfigurationInjector();

    const salt = await bcrypt.genSalt(cfg.getConfig('SALT_SIZE'));

    return await await bcrypt.hash(password, salt);
}


userSchema.pre('save', async function(next){
    /* this piece of mongoose middleware hashes the password just before creating the user */

    if( !this.isModified('password') ){
        // if the password is not modified do not do anything again
        // definitely do not hash the password again, NEVER
        next()
    }

    this.password = await this.hashPassword(this.password);

});


/* create User model from this schema */

const User = mongoose.model('User', userSchema);

export default User;