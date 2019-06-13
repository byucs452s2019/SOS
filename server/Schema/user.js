const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
  avatar: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
