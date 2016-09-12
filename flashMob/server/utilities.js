var User = require('./db/db').User;
var Event = require('./db/db').Event;
var sequelize = require('./db/db').sequelize;
var bcrypt = require('bcrypt');

// hashes a plaintext input and returns hashed value
var hashPassword = function (password, username) {

  bcrypt.genSalt(10, function (err, salt) {

    if (err) {

      console.log(err);
      return;

    }
    
    bcrypt.hash(password, salt, function (err, hash) {

      if (err) {

        console.log(err);
        return;

      } else {

        // new user created in database
        return User.create({

          username: username,
          password: hash

        });

      }

    });

  });

};

// return a boolean value comparison of a plaintext and hashed password
var comparePassword = function (plaintext, hashedPassword) {

  return bcrypt.compareSync(plaintext, hashedPassword);

};

var createUser = function (req, res) {

  // creates new user with data from req.body
  User.sync().then(function () {

    hashPassword(req.body.password, req.body.username);

  });

};

module.exports.findUser = function (req, res) {

  // searches users table for user
  // { replacements } gives a value to :username in the sequelize query
  sequelize.query('SELECT * FROM Users WHERE username = :username',
     { replacements: {username: req.body.username}, type: sequelize.QueryTypes.SELECT }
    )
  .then(function (users) {

    // if user does not exist, create user
    if (users.length === 0) {

      createUser(req, res);
      res.send('User created');

    } else {

      res.status(400).send('Username already exists');
    
    }

  });

};

var createSession = function (req, res) {

  return req.session.regenerate(function () {
    
    // assign user to sessionStore object
    req.sessionStore.user = req.body.username;

  });

};

module.exports.login = function (req, res) {

  // searches users table for user
  // { replacements } gives a value to :username in the sequelize query
  sequelize.query('SELECT password FROM Users WHERE username = :username',
    { replacements: {
      username: req.body.username
      }, 
      type: sequelize.QueryTypes.SELECT 
    })
    .then(function (hashedVal) {

      // the sequelize query returns a results array with an object
      if (hashedVal.length === 1) {

        // use bcrypt to compare plain text password with password from hashedVal
        if (comparePassword(req.body.password, hashedVal[0].password)) {

          // if passwords match, redirect to events page
          // create session
          createSession(req, res);

          res.status(200).send('The login was authenticated and a session was created');

        } else {

          // if passwords do not match, send error code
          res.status(400).send('The password does not match the given username');  
        
        }

      } else {

        // if username does not exist, send error code
        res.status(400).send('The username provided does not match any records');
      
      }
      
    });

};

module.exports.createEvent = function (req, res) {

  // adds new event from parsed request body
  Event.sync().then(function () {

    // new event created in database
    return Event.create({

      title: req.body.title,
      category: req.body.category,
      date: req.body.date,
      description: req.body.description,
      location: req.body.location,
      longitude: req.body.longitude,
      latitude: req.body.latitude
      // organizer to be added later
      // organizer: req.body.organizer

    });

  });

  res.status(201).send('Event created');

};

// searches Events table for events within window range
module.exports.getEventsList = function (req, res) {

  // pulls data from request or sets default value
  var lat = req.body.latitude || 37;
  var long = req.body.longitude || -122;
  var latDelta = req.body.latitudeDelta || 0.0922;
  var longDelta = req.body.longitudeDelta || 0.0421;

  sequelize.query('SELECT * FROM Events WHERE latitude > :boxLatMin and latitude < :boxLatMax and longitude > :boxLongMin and longitude < :boxLongMax',
    { replacements: {
      boxLatMin: lat - (latDelta * .5),
      boxLatMax: lat + (latDelta * .5),
      boxLongMin: long - (longDelta * .5),
      boxLongMax: long + (longDelta * .5)
      },
      type: sequelize.QueryTypes.SELECT
    })
    .then(function (results) {

      // sends an array of results to front-end
      res.send(results);

    });

};

// similar to getEventsList but results array sends markers for map view
module.exports.getEventsMap = function(req, res) {

  var lat = req.body.latitude || 37;
  var long = req.body.longitude || -122;
  var latDelta = req.body.latitudeDelta || 0.0922;
  var longDelta = req.body.longitudeDelta || 0.0421;

  sequelize.query('SELECT * FROM Events WHERE latitude > :boxLatMin and latitude < :boxLatMax and longitude > :boxLongMin and longitude < :boxLongMax',
    { replacements: {
      boxLatMin: lat - (latDelta * .5),
      boxLatMax: lat + (latDelta * .5),
      boxLongMin: long - (longDelta * .5),
      boxLongMax: long + (longDelta * .5)
      },
      type: sequelize.QueryTypes.SELECT
    })
    .then(function (results) {

      var markers = [];

      // builds a marker object from each event and adds to markers array
      results.forEach(function (item) {

        var marker = {

          title: item.title,
          description: item.description,
          latlng: {
            longitude: item.longitude,
            latitude: item.latitude
          }
        
        };

      markers.push(marker);

      });

    res.send(markers);

    });

};