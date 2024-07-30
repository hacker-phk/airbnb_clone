const mongoose = require('mongoose');
const User = require('./user'); // Make sure the path to user.js is correct

const placeSchema = new mongoose.Schema({
  title: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  address: String,
  addedPhotos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number,
});

const Place = mongoose.model('Place', placeSchema);


module.exports = Place;
