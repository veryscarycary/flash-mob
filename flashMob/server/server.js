var express = require('express');
var routes = require('./router');
var bodyParser = require('body-parser');
var db = require('./db/db').sequelize;

var app = express();
app.use(bodyParser.json());
app.use('/', routes);

var port = process.env.port || 3000;

app.listen(port, function () {
  console.log('Server listening on localhost:', port);
});