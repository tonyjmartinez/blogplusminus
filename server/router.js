const Auth = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");
const expressGraphQL = require("express-graphql");
const schema = require("../server/schema/schema");
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });
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

  //app.get("/tokenSignin", requireAuth, Auth.tokenSignin);

  //app.post("/signin", requireSignin, Auth.signin);

  //app.post("/signup", Auth.signup);
};
