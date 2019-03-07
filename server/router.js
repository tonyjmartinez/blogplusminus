const Auth = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.get("/tokenSignin", requireAuth, Auth.tokenSignin);

  app.post("/signin", requireSignin, Auth.signin);

  app.post("/signup", Auth.signup);
};
