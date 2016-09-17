var express = require('express');
var utils = require('./utilities');
var router = express.Router();

router.post('/api/myEvents', function (req, res) {
  utils.findMyEvents(req, res);
});

router.post('/api/myPastEvents', function (req, res) {
  utils.findMyPastEvents(req, res);
});

router.post('/api/login', function (req, res) {

  utils.login(req, res);

});

router.post('/api/delete', function (req, res) {

  utils.deleteEvent(req, res);

});

router.post('/api/addPublic', function (req, res) {

  utils.addPublicEvent(req, res);

});

router.post('/api/signup', function (req, res) {

  utils.findUser(req, res);

});

router.post('/api/checkConfirm', function (req, res) {

  utils.checkConfirm(req, res);

});

router.post('/api/setConfirm', function (req, res) {

  utils.setConfirm(req, res);

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