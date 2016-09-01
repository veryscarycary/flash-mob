var express = require('express');

var app = express();

var port = process.env.port || 3000;

app.get('/', function(req, res) {
  console.log('Got GET request');
  res.send('Why helo thar ;0');
});

app.get('*', function(req, res) {
  res.send('404, sari gurl.');
});

app.listen(port, function () {
  console.log('Server listening on localhost:', port);
});