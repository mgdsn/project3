const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  users: [{type: String}],
  messages: [{type: String}]
});

module.exports = mongoose.model('Chat', ChatSchema);