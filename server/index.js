const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const http = require("http");
const Auth = require("./controllers/authentication");
const expressGraphQL = require("express-graphql");
const schema = require("../server/schema/schema");
const jwt = require("express-jwt");
const config = require("./config.js");
const jsonwebtoken = require("jsonwebtoken");
const refresh = require("./refresh");

function tokenForUser(user) {
  return jsonwebtoken.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      token: user.token
    },
    config.secret,
    {
      expiresIn: "1d"
    }
  );
}
const auth = jwt({
  secret: config.secret,
  credentialsRequired: false,
  getToken: function fromHeader(req) {
    if (req.headers.authorization.split(" ")[0] === "Bearer") {
      let token = req.headers.authorization.split(" ")[1];
      return jsonwebtoken.verify(
        token,
        config.secret,
        //{ ignoreExpiration: true },
        (err, decoded) => {
          if (err) {
            console.log("error sdfoafnhsaoh", err.name);

            if (err.name === "TokenExpiredError") {
              console.log("token expired");
              console.log(decoded);
              console.log("ref token???", req.headers.authrefresh);
              return jsonwebtoken.verify(
                token,
                config.secret,
                { ignoreExpiration: true },
                (err, decoded) => {
                  console.log("decoded?", decoded);
                  if (err) {
                    console.log(err);
                  } else {
                    const refreshToken = req.headers.authrefresh;

                    if (
                      refreshToken in refresh.tokens &&
                      refresh.tokens[refreshToken] === decoded.username
                    ) {
                      console.log("yes");
                      decoded.token = tokenForUser(decoded);

                      return tokenForUser(decoded);
                    }
                  }
                }
              );
            }
          } else if (decoded) {
            console.log("decoded", decoded);
            return req.headers.authorization.split(" ")[1];
          }
        }
      );

      console.log("here");

      return req.headers.authorization.split(" ")[1];
    } else {
      return null;
    }
  }
});

const refreshCheck = (err, req, res, next) => {
  console.log("inside refresh");
  const token = auth(req);
  console.log(token);
  next();
};

mongoose.connect("mongodb://localhost/auth", { useNewUrlParser: true });

app.use(morgan("combined"));
app.use(cors());

app.use(
  "/graphql",
  bodyParser.json(),
  auth,
  expressGraphQL(req => ({
    schema,
    graphiql: true,
    context: {
      user: req.user
    }
  }))
);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);
