var Sequelize = require('sequelize');
var sequelize = new Sequelize('flashMob', 'root', 'hr47');

// TRIED THIS:
// {
//   host: 'localhost',
//   dialect: 'mysql',
//   port: 3306
// }

// var sequelize = new Sequelize('mysql://');

// model definition for Users
var User = sequelize.define('User', {

  username: Sequelize.STRING,
  password: Sequelize.STRING

});

// model definition for Events
var Event = sequelize.define('Event', {

  name: Sequelize.STRING,
  description: Sequelize.STRING,
  time: Sequelize.STRING,
  location: Sequelize.STRING,
  // Foreign key relationship with Users table
  organizer: Sequelize.STRING

});

// force: true drops table if it exists, development only
User.sync({force: true}).then(function() {
});

Event.sync({force: true}).then(function () {
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