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

const auth = jwt({
  secret: config.secret,
  credentialsRequired: false
});

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
