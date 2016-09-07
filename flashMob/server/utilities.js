var User = require('./db/db').User;
var sequelize = require('./db/db').sequelize;

module.exports.createUser = function (req, res) {

  var user = {
    username: req.body.username,
    password: req.body.password
  };

  // creates new user with data from req.body
  User.sync().then(function() {
    return User.create({
      username: user.username,
      password: user.password
    });
  });

};

module.exports.findUser = function (req, res) {

  var username = req.body.username;

  // searches users table for user
  // { replacements } gives a value to :username in the sequelize query
  sequelize.query('SELECT * FROM Users WHERE username = :username',
     { replacements: {username: username}, type: sequelize.QueryTypes.SELECT }
    )
  .then(function (users) {
    // if user does not exist, create user
    if (users.length === 0) {
      module.exports.createUser(req, res);
      res.send('Username created');
    } else {
      res.send('Username already exists');
    }
  });
  
};