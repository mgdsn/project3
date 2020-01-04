const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayname: { type: String},
  zip: {type: Number},
  photo: {type: String},
  distance: {type: Number},
  age: {type: Number},
  minage: {type: Number},
  maxage: {type: Number},
  gender: {type: String},
  malematch: { type: Boolean, default: false },
  femalematch: { type: Boolean, default: false },
  othermatch: { type: Boolean, default: false },
  subculture: {type: String},
  about: {type: String},
  liked: [{type: String}],
  rejected: [{type: String}],
  zipdist: [{type: String}]
});

UserSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds,
      function(err, hashedPassword) {
      if (err) {
        next(err);
      }
      else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}

module.exports = mongoose.model('User', UserSchema);