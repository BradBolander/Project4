var mongoose = require('mongoose');

var GalaxySchema = new mongoose.Schema({
  name: 'string',
  description: 'string',
  radius: 'number',
  particles: 'number',
  height: 'number',
  color: 'string'
});

module.exports = mongoose.model('Galaxies', GalaxySchema);
