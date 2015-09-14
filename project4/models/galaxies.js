var mongoose = require('mongoose');

var GalaxySchema = new mongoose.Schema({
  name: String,
  description: String,
  radius: Number,
  particles: Number,
  height: Number,
  color: String,
  likes: Number
});

module.exports = mongoose.model('galaxies', GalaxySchema);
