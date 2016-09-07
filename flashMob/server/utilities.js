var User = require('./db/db').User;
var Event = require('./db/db').Event;
var sequelize = require('./db/db').sequelize;

module.exports.createUser = function (req, res) {

  // creates new user with data from req.body
  User.sync().then(function() {
    return User.create({
      username: req.body.username,
      password: req.body.password
    });
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
      module.exports.createUser(req, res);
      res.status(303).redirect('/api/events');
    } else {
      res.status(400).send('Username already exists');
    }
  });

};

module.exports.login = function (req, res) {

  // searches users table for user
  // { replacements } gives a value to :username and :password in the sequelize query
  sequelize.query('SELECT * FROM Users WHERE username = :username AND password = :password',
    { replacements: {
      username: req.body.username,
      password: req.body.password
      }, 
      type: sequelize.QueryTypes.SELECT 
    })
    .then(function (users) {
      // if user does not exist, create user
      if (users.length === 1) {
        // create session
        res.status(303).redirect('/api/events');
      } else {
        res.status(400).send('The username and password provided do not match any records');
      }
    });
};

module.exports.createEvent = function (req, res) {

  // adds new event from parsed request body
  Event.sync().then(function() {
    return Event.create({
      title: req.body.title,
      category: req.body.category,
      distance: req.body.distance,
      time: req.body.time,
      description: req.body.description,
      organizer: req.body.organizer
    });
  });

  res.status(201).send('Event created! Happy day! =D');

};

