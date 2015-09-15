var mongoose = require('mongoose');

var GalaxySchema = new mongoose.Schema({
  name: String,
  description: String,
  radius: Number,
  radius2: Number,
  radius3: Number,
  particles: Number,
  particles2: Number,
  particles3: Number,
  height: Number,
  height2: Number,
  height3: Number,
  color: String,
  color2: String,
  color3: String,
  size: Number,
  size2: Number,
  size3: Number,
  likes: Number,
  mode: Number,
  speed: Number
});

module.exports = mongoose.model('galaxies', GalaxySchema);
