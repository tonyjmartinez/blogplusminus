const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/auth", { useNewUrlParser: true });
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const http = require("http");
const Auth = require("./controllers/authentication");
const expressGraphQL = require("express-graphql");
const schema = require("../server/schema/schema");

app.use(morgan("combined"));
app.use(cors());

app.use(
  "/graphql",
  bodyParser.json(),
  Auth.jwtAuth,
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
