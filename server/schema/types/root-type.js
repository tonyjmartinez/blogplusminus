const graphql = require("graphql");
const { GraphQLObjectType } = graphql;
const UserType = require("./user-type");
const AuthType = require("./auth-type");

const RootType = new GraphQLObjectType({
  name: "RootType",
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    auth: {
      type: AuthType,
      resolve(parentValue, args, { user }) {
        if (!user) {
          throw new Error("You are not authenticated!");
        }
        console.log(user);
        return user;
      }
    }
  }
});

module.exports = RootType;
