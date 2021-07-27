const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt'); 
const Post = require('./Post');

const userSchema = new Schema({
  userName:{
    type:String,
    required: true,
    min: 3,
    max: 20,
    unique:true
  },

  firstName: {
    type: String,
    required: true,
    trim: true
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address']
  },

  password: {
    type: String,
    required: true,
    minlength: 5
  },

  profilePicture:{
    type: String,
    default: ''
  },

  coverPicture:{
    type: String,
    default: '',
  },

  followers:{
    type: Array,
    default: []
  },

  followerings:{
    type: Array,
    default: []
  },

  desc: {
    type: String,
    max: 120
  },

  city:{
    type: String,
    max: 50
  },

  posts: [Post.schema]

},
{
  toJSON: {
    virtuals: true,
  },
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
