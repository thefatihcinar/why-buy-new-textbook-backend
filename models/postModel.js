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


/* delete the references when a post is deleted
   the references are in the following collections:
*/
postSchema.pre("remove", async function (next) {

    const postID = this._id;

    /* remove this post id form the published posts of the seller */
    await User.updateOne({_id: deletedPost.seller}, { $pull: { publishedPosts: postID } } );

    /* remove this post id from the starred posts of the seller */
    await User.updateOne({_id: deletedPost.seller}, { $pull: { starredPosts: postID } } );

    /* remove this post id from the recommended posts of the seller */
    await User.updateOne({_id: deletedPost.seller}, { $pull: { recommendedPosts: postID } } );

    next();
});

/* create Post model from this schema */

const Post = mongoose.model('Post', postSchema);

export default Post;