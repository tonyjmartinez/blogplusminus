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

const auth = jwt({
  secret: config.secret,
  credentialsRequired: false,
  getToken: function fromHeader(req) {
    console.log("get token", req);
    if (req.headers.authorization.split(" ")[0] === "Bearer") {
      jsonwebtoken.verify(
        req.headers.authorization.split(" ")[1],
        config.secret,
        (err, decoded) => {
          if (err) {
            console.log("error sdfoafnhsaoh", err);
          } else if (decoded) {
            if (decoded.refreshToken in refresh.tokens) {
              console.log("miracle");
            }

            console.log("decoded aokfhaofhdsa", decoded);
          }
        }
      );

      return req.headers.authorization.split(" ")[1];
    } else {
      return null;
    }
  }
});

const refreshCheck = (err, req, res, next) => {
  console.log("error", err);
  console.log("error inner token exp", err.inner.name);
  if (err.inner.name === "TokenExpiredError") {
    console.log("expired", req.body);
  }
  console.log("inside refresh");
  console.log("errorrrrr", err);
  console.log("REFRESH -------------------", req.context);
  next();
};

mongoose.connect("mongodb://localhost/auth", { useNewUrlParser: true });

app.use(morgan("combined"));
app.use(cors());

app.use(
  "/graphql",
  bodyParser.json(),
  auth,
  refreshCheck,
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
