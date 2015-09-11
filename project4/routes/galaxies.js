var express = require('express');
var router = express.Router();

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var Galaxy = require('../models/Galaxies');

/* GET */
router.get('/', function(req, res, next) {
  console.log(req.body);
  Galaxy.find(function (err, galaxies) {
    if (err) return next(err);
    res.json(galaxies);
  });
});

/* POST */
router.post('/', function(req, res, next) {
  console.log(req.body);
  Galaxy.create(req.body, function (err, galaxy) {
    if (err) return next(err);
    res.json(galaxy);
  });
});

/* GET */
router.get('/:id', function(req, res, next) {
  Galaxy.findById(req.params.id, function (err, galaxy) {
    if (err) return next(err);
    res.json(galaxy);
  });
});

/* PUT */
router.put('/:id', function(req, res, next) {
  console.log(req.body);
  Galaxy.findByIdAndUpdate(req.params.id, req.body, function (err, galaxy) {
    if (err) return next(err);
    res.json(galaxy);
  });
});

/* PATCH */
router.patch('/:id', function(req, res, next) {
  console.log(req.body);
  Galaxy.findByIdAndUpdate(req.params.id, req.body, function (err, galaxy) {
    if (err) return next(err);
    res.json(galaxy);
  });
});

/* DELETE */
router.delete('/:id', function(req, res, next) {
  console.log(req.body);
  Galaxy.findByIdAndRemove(req.params.id, req.body, function (err, galaxy) {
    if (err) return next(err);
    res.json(galaxy);
  });
});

module.exports = router;
