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

postSchema.pre('find', softDeleteMiddleware);
postSchema.pre('findOne', softDeleteMiddleware);

function softDeleteMiddleware(next) {
  // If `isDeleted` is not set on the query, set it to `false` so we only, get docs that haven't been deleted by default
  
  let filter = this.getQuery();

  if (filter.isDeleted == null) filter.isDeleted = false;
  
  next();
}


postSchema.pre('find', isSoldMiddleware);
postSchema.pre('findOne', isSoldMiddleware);

function isSoldMiddleware(next) {
  // If `isSold` is not set on the query, set it to `false` so we only, get posts that haven't been sold by default
  let filter = this.getQuery();
  
  if (filter.isSold == null) filter.isSold = false;

  next();
}

postSchema.pre('find', isApprovedMiddleware);
postSchema.pre('findOne', isApprovedMiddleware);

function isApprovedMiddleware(next) {
  // If `isApproved` is not set on the query, set it to `true` so we only get posts that are approved by default
  // therefore do not get posts that are not approved yet

  let filter = this.getQuery();

  if (filter.isApproved == null) filter.isApproved = true;

  next();
}

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