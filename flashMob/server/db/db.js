var Sequelize = require('sequelize');
var sequelize = new Sequelize('flashMob', 'root', 'hr47');

// model definition for Users
var User = sequelize.define('User', {

  username: Sequelize.STRING,
  password: Sequelize.STRING

});

// model definition for Events
var Event = sequelize.define('Event', {
  
  title: Sequelize.STRING,
  category: Sequelize.STRING,
  date: Sequelize.DATE,
  description: Sequelize.TEXT(),
  location: Sequelize.STRING,
  longitude: Sequelize.DOUBLE,
  latitude: Sequelize.DOUBLE,
  created_by: Sequelize.STRING,
  private: Sequelize.STRING,
  instagramHashtag: Sequelize.STRING
  // Foreign key relationship with Users table to be added later
  // organizer: Sequelize.STRING

});

// force: true drops table if it exists, development only
User.sync().then(function () {
});

Event.sync().then(function () {
});

var EventUser = sequelize.define('EventUser', {
  EventId: Sequelize.INTEGER,
  UserId: Sequelize.INTEGER,
  Confirmed: Sequelize.STRING
});

Event.belongsToMany(User, {through: 'EventUser', foreignKey: 'EventId'});
User.belongsToMany(Event, {through: 'EventUser', foreignKey: 'UserId'});

EventUser.sync();

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
module.exports.EventUser = EventUser;