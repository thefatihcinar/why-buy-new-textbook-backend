import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
  {
    "seller": { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    "title": { type: String, required: true },
    "author": { type: String, required: true },
    "edition": { type: String},
    "language": { type: String, required: true },
    "category": { type: String, required: true },
    "type": { type: String, required: true },
    "price": { type: Number, required: true },
    "condition": { type: String, required: true },
    "description": { type: String, required: true },
    "isApproved": { type: Boolean, required: true, default: false },
    "isDeleted": { type: Boolean, required: true, default: false },
    "mainImage": { type: String, default: "" },
    "city": { type: String, required: true },
  },{ timestamps : true});

/* create Post model from this schema */

const Post = mongoose.model('Post', postSchema);

export default Post;