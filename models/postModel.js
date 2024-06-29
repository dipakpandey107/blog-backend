// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   publishDate: { type: Date, default: Date.now },
//   lastUpdated: { type: Date, default: Date.now },
//   category: { type: String },
//   featuredImage: { type: String },
// });

// const Post = mongoose.model('Post', postSchema);

// module.exports = Post;

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Post', postSchema);
