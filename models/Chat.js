const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  senderemail: { type: String},
  receiveremail: {type: String},
  message: {type: String},
  timestamps: true

});

module.exports = mongoose.model('Chat', ChatSchema);