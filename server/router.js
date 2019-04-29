const Auth = require("./controllers/authentication");

const expressGraphQL = require("express-graphql");
const schema = require("../server/schema/schema");

const jwt = require("express-jwt");
const config = require("./config.js");

const auth = jwt({
  secret: config.secret,
  credentialsRequired: false
});

module.exports = function(app) {
  app.use(
    "/graphql",
    auth,
    expressGraphQL(req => ({
      schema,
      graphiql: true,
      context: {
        user: req.user
      }
    }))
  );
};
