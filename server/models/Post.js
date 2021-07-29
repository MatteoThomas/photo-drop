const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
title:{ type:String
},

body: {type: String
},

userName:{type: String
},

image: {
    type: String
},
createdAt: String,
comments: [
    {
    body: String,
    userName: String,
    createdAt: String
    }
],
likes: [
    {
    userName: String,
    createdAt: String
    }
],
user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
}
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;