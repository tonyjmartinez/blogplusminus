const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({
    token: tokenForUser(req.user),
    user: {
      username: req.user.username,
      email: req.user.email
    }
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
