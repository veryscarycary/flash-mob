var express = require('express');
var utils = require('./utilities');
var router = express.Router();

router.post('/api/login', function (req, res) {

  utils.login(req, res);

});

router.post('/api/signup', function (req, res) {

  utils.findUser(req, res);

});

router.post('/api/events', function (req, res) {

  utils.createEvent(req, res);

});

router.post('/api/eventsList', function (req, res) {

  utils.getEventsList(req, res);

});

router.post('/api/eventsMap', function (req, res) {

  utils.getEventsMap(req, res);
  
});

module.exports = router;