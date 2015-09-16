var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost/Galaxies';

mongoose.connect(connectionString);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + connectionString);
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose connection error: ' + error);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected!');
});
