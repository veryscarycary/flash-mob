var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log('GET at /');
  res.redirect('/api/login');
});

router.get('/api/login', function(req, res) {
  console.log('GET at /login');
  res.send('Arrived at /login');
});

router.post('/api/login', function(req, res) {
  console.log('POSTED to /api/login');
  res.send('POSTED to /api/login');
});

router.get('/api/home', function(req, res) {
  console.log('GET at /api/home');
  res.send('Arrived at /api/home');
});

router.get('/api/users', function(req, res) {
  console.log('GET at /api/users');
  res.send('Arrived at /api/users');
});

router.get('/api/users/user', function (req, res) {
  console.log('GET at /api/users/user');
  res.send('Arrived at /api/users/user');
});

router.post('/api/users/user', function (req, res) {
  console.log('POST at /api/users/user');
  res.send('Posted at /api/users/user');
});

router.get('/api/events', function(req, res) {
  console.log('GET at /api/events');
  res.send('Arrived at /api/events');
});

router.get('/api/events/event', function (req, res) {
  console.log('GET at /api/events/event');
  res.send('Arrived at /api/events/event');
});

router.post('/api/events/event', function (req, res) {
  console.log('POST at /api/events/event');
  res.send('Posted to /api/events/event');
});

router.get('*', function(req, res) {
  console.log('GET at *');
  res.send('404, sari gurl.');
});

module.exports = router;