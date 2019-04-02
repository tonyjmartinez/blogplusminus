const graphql = require("graphql");
const { GraphQLObjectType } = graphql;
const UserType = require("./user-type");
const User = require("../../models/user");

const RootType = new GraphQLObjectType({
  name: "RootType",
  fields: {
    user: {
      type: UserType,
      async resolve(parentValue, args, { user }) {
        if (!user) {
          console.log("You are not authenticated!");
          return null;
        }
        const foundUser = await User.findById(user.id);
        return foundUser;
      }
    }
  }
});

module.exports = RootType;
