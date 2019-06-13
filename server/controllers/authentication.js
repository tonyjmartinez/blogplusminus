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



exports.login = function({ email, password }, cb) {
  const AUTH_FAIL_MSG = "Username/password combination incorrect"
  if (email === "" || email === null || password === "" || password === null) {
    return cb(null, "Missing email and/or password");
  }
  User.findOne({ email: email }, function(err, user) {
    if (!user) {
      return cb(null, AUTH_FAIL_MSG);
    }

    user.comparePassword(password, function(err, match) {
      if (err) {
        return cb(null, AUTH_FAIL_MSG);
      }

      if (!match) {
        return cb(null, AUTH_FAIL_MSG);
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

      const refreshToken = randToken.uid(256);
      refresh.tokens[refreshToken] = username;
      return cb(
        { jwt: tokenForUser(user), refreshToken },
        "New user was created"
      );
    });
  });
};

exports.checkToken = authorize;