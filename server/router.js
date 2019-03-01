const Auth = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.send({ hello: "there" });
  });

  app.post("/signup", Auth.signup);
};
