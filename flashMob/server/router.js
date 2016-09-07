var express = require('express');
var utils = require('./utilities');
var router = express.Router();

router.post('/api/login', function (req, res) {

  utils.login(req, res);

});

router.post('/api/signup', function (req, res) {

  utils.findUser(req, res);

});

router.get('/api/events', function (req, res) {

  utils.getEvents(req, res);

});

router.post('/api/events', function (req, res) {

  utils.createEvent(req, res);

});

module.exports = router;