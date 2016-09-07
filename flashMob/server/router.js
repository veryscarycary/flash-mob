var express = require('express');
var utils = require('./utilities');
var router = express.Router();

router.post('/api/login', function(req, res) {

  utils.login(req, res);

});

router.post('/api/signup', function(req, res) {

  utils.findUser(req, res);

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
  res.send('Arrived at api/events');

});

router.post('/api/events', function(req, res) {

  console.log('Post at /api/events');
  utils.createEvent(req, res);

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