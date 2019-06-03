const mongoose = require("mongoose");
const User = require("../models/user");
const config = require("../config");
const jwt = require("jsonwebtoken");
const randToken = require("rand-token");
const refresh = require("../refresh");
const jwtExpress = require("express-jwt");

function tokenForUser(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
      token: user.token ? user.token : null,
      expires: user.expires ? user.expires : null
    },
    config.secret,
    {
      expiresIn: "1d"
    }
  );
}

exports.jwtAuth = jwtExpress({
  secret: config.secret,
  credentialsRequired: false,
  getToken: function fromHeader(req) {
    console.log("getToken");
    if (req.headers.authorization === undefined) {
      return;
    }
    if (req.headers.authorization.split(" ")[0] === "Bearer") {
      let token = req.headers.authorization.split(" ")[1];
      const refreshToken = req.headers.authrefresh;
      return authorize(token, refreshToken);
    } else {
      return;
    }
  }
});

const authorize = function(token, refreshToken) {
  return jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return jwt.verify(
          token,
          config.secret,
          { ignoreExpiration: true },
          (err, decoded) => {
            if (err) {
              console.log(err);
            } else {
              if (
                refreshToken in refresh.tokens &&
                refresh.tokens[refreshToken] === decoded.username
              ) {
                decoded.token = tokenForUser(decoded);
                const expires = new Date();
                expires.setSeconds(expires.getSeconds() + 86400);
                decoded.expires = expires;
                return tokenForUser(decoded);
              } else {
                return null;
              }
            }
          }
        );
      } else {
        return null;
      }
    } else if (decoded) {
      return token;
    }
  });
};

exports.checkToken = authorize;

exports.login = function({ email, password }, cb) {
  console.log("login", email, password);
  if (email === "" || email === null || password === "" || password === null) {
    return cb(null, "missing email or password");
  }
  User.findOne({ email: email }, function(err, user) {
    console.log("find one");
    if (!user) {
      console.log("not found");
      return cb(null, "No user with that email");
    }

    user.comparePassword(password, function(err, match) {
      if (err) {
        console.log("error check");
        return cb(null, "Error checking password");
      }

      if (!match) {
        console.log("no match");
        return cb(null, "Incorrect password");
      }

      const refreshToken = randToken.uid(256);
      refresh.tokens[refreshToken] = user.username;

      return cb({ jwt: tokenForUser(user), refreshToken }, "Success");
    });
  });
};

exports.signup = function({ email, password, username }, cb) {
  if (!email || !password) {
    return cb(null, "Email and password required");
  }

  console.log(email, password);

  User.findOne({ email: email }, function(err, existingUser) {
    console.log("here");
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
      console.log("141");
      if (err) {
        return cb(null, "User save error");
      }

      const refreshToken = randToken.uid(256);
      refresh.tokens[refreshToken] = username;
      return cb(
        { jwt: tokenForUser(user), refreshToken },
        "New user was created"
      );
    });
  });
};
