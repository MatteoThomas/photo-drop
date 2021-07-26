const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  postId:{
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    max: 50,
  },

  image: {
    type: String
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },

  likes:[{ 
    type: ObjectId,
    ref: 'User'
  }],
  
  comments : [
    {
      text: String,
      created: { type: Date, default: Date.now},
      postedBy: { type: ObjectId, ref: 'User'}
    }
  ]

},
{
  timestamps: true

},
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
