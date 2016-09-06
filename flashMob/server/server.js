var express = require('express');
var routes = require('./router');
var db = require('./db/db');

var app = express();

app.use('/', routes);

var port = process.env.port || 3000;

app.listen(port, function () {
  console.log('Server listening on localhost:', port);
});