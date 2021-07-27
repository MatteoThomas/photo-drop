const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  cat: {
    type: String,
    required: true,
    trim: true
  }
});

const Categor = mongoose.model('Category', categorySchema);

module.exports = Categor;