const User = require("../models/user");
const config = require("../config");
const jwt = require("jsonwebtoken");

function tokenForUser(user) {
  return jwt.sign({ id: user.id, email: user.email }, config.secret, {
    expiresIn: "1d"
  });
}

exports.login = function({ email, password }, cb) {
  console.log(email);
  User.findOne({ email: email }, function(err, user) {
    console.log(user);

    if (!user) {
      return cb(null, "No user with that email");
    }

    console.log(password, user.password);

    user.comparePassword(password, function(err, match) {
      if (err) {
        return cb(null, "Error");
      }
      if (!match) {
        return cb(null, "Incorrect password");
      }

      return cb(tokenForUser({ email, password }), "Success");
    });
  });
};

exports.tokenSignin = function(req, res, next) {
  res.send({
    user: {
      username: req.user.username,
      email: req.user.email
    }
  });
};

exports.signup = function({ email, password, username }, cb) {
  if (!email || !password) {
    return cb(null, "Email and password required");
  }

  console.log(email);

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return cb(null, "Error");
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return cb(null, "Email is in use");
    }

    console.log(password);

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password,
      username: username
    });

    user.save(function(err) {
      if (err) {
        return cb(null, "Save error");
      }

      console.log(user);

      // Repond to request indicating the user was created
      return cb(tokenForUser(user), "New user was created");
    });
  });
};
