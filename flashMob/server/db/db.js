var app = require('../server');
var Sequelize = require('sequelize');

// SQL credentials:
// Sequelize([database name], [SQL username], [SQL password]);
var sequelize = new Sequelize('flashMob', 'root', 'hr47');

// model definition for Users
var User = sequelize.define('User', {

  username: Sequelize.STRING,
  password: Sequelize.STRING,
  session: Sequelize.STRING

});

// model definition for Events
var Event = sequelize.define('Event', {
  //longitude: Sequelize.NUMBER,
  //latitude: Sequelize.NUMBER,
  title: Sequelize.STRING,
  category: Sequelize.STRING,
  location: Sequelize.STRING, // get rid of this
  date: Sequelize.DATE,
  description: Sequelize.TEXT()
  // Foreign key relationship with Users table to be added later
  // organizer: Sequelize.STRING

});

// force: true drops table if it exists, development only
// {force: true}
User.sync().then(function () {
});

Event.sync().then(function () {
});

sequelize.authenticate()
  .then(function(err) {
    console.log('Connection has been made successfully.');
  })
  .catch(function(err) {
    console.log('Unable to connect to the db: ', err);
  });

module.exports.sequelize = sequelize;
module.exports.User = User;
module.exports.Event = Event;