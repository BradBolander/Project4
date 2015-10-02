var express = require('express');
var router = express.Router();

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var galaxyModel = require('../models/galaxies');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Galaxies'
  });
});


module.exports = router;
