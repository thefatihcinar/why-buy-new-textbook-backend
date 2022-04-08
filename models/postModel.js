import mongoose from 'mongoose'
/* Utilities */
import ConfigurationInjector from '../utilities/configurationInjection.js'
import User from '../models/userModel.js'

/* access the application level configuraions */
const cfg = new ConfigurationInjector();

const postSchema = mongoose.Schema(
  {
    "seller": { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    "isShippable": { type: Boolean, default: false },
    "isAvailableForFacetoFaceSelling": { type: Boolean, default: true },
    "price": { type: Number, required: true, min: 0 },
    "title": { type: String, required: true },
    "author": { type: String },
    "mainImage": { type: String, default: cfg.getConfig('DEFAULT_MAIN_IMAGE_URL') },
    "relatedCity": { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
    "relatedInstitution": { type: mongoose.Schema.Types.ObjectId, ref: 'Institution' },
    "type": { type: String, required: true },
    "description": { type: String, required: true },
    "condition": { type: String, required: true },
    "isApproved": { type: Boolean, default: true },
    "isDeleted": { type: Boolean, default: false },
    "isSold": { type: Boolean, default: false},
    "images": [ { type: String } ],
    "starredBy": [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

  },{ timestamps : true});

/* Delete users' posts when user is removed */
  postSchema.pre("remove", async function (next) {
    const post = this;

    await User.deleteMany({ publishedPosts: post._id });
    await User.deleteMany({ starredPosts: post._id });
    await User.deleteMany({ recommendedPosts: post._id });

    next();
});

/* create Post model from this schema */

const Post = mongoose.model('Post', postSchema);

export default Post;