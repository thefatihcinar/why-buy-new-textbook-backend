import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
  {
    "title": { type: String, required: true },
    "price": { type: Number, required: true },
    "description": { type: String, required: true },
    "isApproved": { type: Boolean, required: true, default: false },
    "isDeleted": { type: Boolean, required: true, default: false },
    "mainImage": { type: String, default: "" },
    "city": { type: String, required: true},
  },{ timestamps : true});

/* create Post model from this schema */

const Post = mongoose.model('Post', postSchema);

export default Post;