var express = require('express');
var routes = require('./router');
var bodyParser = require('body-parser');
var expressSession = require('express-session');

var app = express();

app.use(bodyParser.json());

// maintains session on every server interaction
app.use(expressSession({
  secret: 'Purposeful_Llama_Pass',
  resave: false,
  saveUninitialized: true
}));

app.use('/', routes);

var port = process.env.port || 3000;

app.listen(port, function () {
  console.log('Server listening on localhost:', port);
});