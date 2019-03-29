const User = require("../models/user");
const config = require("../config");
const jwt = require("jsonwebtoken");

function tokenForUser(user) {
  return jwt.sign({ id: user._id, email: user.email }, config.secret, {
    expiresIn: "1d"
  });
}

exports.login = function({ email, password }, cb) {
  User.findOne({ email: email }, function(err, user) {
    if (!user) {
      return cb(null, "No user with that email");
    }

    user.comparePassword(password, function(err, match) {
      if (err) {
        return cb(null, "Error checking password");
      }

      if (!match) {
        return cb(null, "Incorrect password");
      }

      return cb(tokenForUser({ email, password }), "Success");
    });
  });
};

exports.signup = function({ email, password, username }, cb) {
  if (!email || !password) {
    return cb(null, "Email and password required");
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return cb(null, "Error finding user");
    }

    if (existingUser) {
      return cb(null, "Email is in use");
    }

    const user = new User({
      email: email,
      password: password,
      username: username
    });

    user.save(function(err) {
      if (err) {
        return cb(null, "User save error");
      }

      return cb(tokenForUser(user), "New user was created");
    });
  });
};
