const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
  pic: String,
  title: String,
  description: String,
  user_id: Number
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
