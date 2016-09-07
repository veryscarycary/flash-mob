var express = require('express');
var utils = require('./utilities');
var router = express.Router();

router.post('/api/login', function(req, res) {

  console.log('Posted to /api/login');
  res.send('Posted to /api/login');

});

router.post('/api/signup', function(req, res) {

  console.log('Posted to /api/signup');
  utils.findUser(req, res);

});

router.get('/api/home', function(req, res) {

  console.log('Get at /api/home');
  res.send('Arrived at /api/home');

});

router.get('/api/users', function(req, res) {

  console.log('Get at /api/users');
  res.send('Arrived at /api/users');

});

router.get('/api/users/user', function (req, res) {

  console.log('Get at /api/users/user');
  res.send('Arrived at /api/users/user');

});

router.post('/api/users/user', function (req, res) {

  console.log('Post at /api/users/user');
  res.send('Posted at /api/users/user');
  
});

router.get('/api/events', function(req, res) {

  console.log('Get at /api/events');
  res.send('Arrived at /api/events');

});

router.get('/api/events/event', function (req, res) {

  console.log('Get at /api/events/event');
  res.send('Arrived at /api/events/event');

});

router.post('/api/events/event', function (req, res) {

  console.log('Post at /api/events/event');
  res.send('Posted to /api/events/event');

});

module.exports = router;