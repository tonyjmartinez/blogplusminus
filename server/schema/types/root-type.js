const graphql = require("graphql");
const { GraphQLObjectType } = graphql;
const UserType = require("./user-type");
const User = require("../../models/user");

const RootType = new GraphQLObjectType({
  name: "RootType",
  fields: {
    user: {
      type: UserType,
      async resolve(parentValue, args, req) {
        if (req.user) {
          console.log("requser", req.user);
          return req.user;
        } else if (!req.user) {
          console.log("You are not authenticated!");
          return null;
        } else {
          const foundUser = await User.findById(req.user.id);
          return foundUser;
        }
      }
    }
  }
});

module.exports = RootType;
