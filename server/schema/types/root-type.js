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
          throw new Error("You are not authenticated!");
        }
        return await User.findById(user.id);
      }
    }
  }
});

module.exports = RootType;
