const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;
const axios = require("axios");

const UserType = require("./types/user-type");
const AuthType = require("./types/auth-type.js");
const Auth = require("../controllers/authentication");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: AuthType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        username: { type: GraphQLString }
      },
      resolve(parentValue, { email, password, username }, req) {
        return new Promise((resolve, reject) => {
          const creds = { email, password, username };

          Auth.signup(creds, function(user, msg) {
            console.log(msg);
            if (user === null) {
              console.log("problem", msg);
            }
            console.log(user);
            resolve(user);
          });
        });
      }
    }
  }
});

module.exports = mutation;
