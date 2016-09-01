var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log('Got GET request');
  res.send('Why helo thar ;0');
});

router.get('*', function(req, res) {
  res.send('404, sari gurl.');
});

module.exports = router;