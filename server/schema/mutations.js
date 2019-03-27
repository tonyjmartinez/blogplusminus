const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;
const axios = require("axios");

const UserType = require("./types/user-type");
const Auth = require("../controllers/authentication");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: GraphQLString,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        username: { type: GraphQLString }
      },
      resolve(parentValue, { email, password, username }, req) {
        return new Promise((resolve, reject) => {
          const creds = { email, password, username };

          Auth.signup(creds, function(token, msg) {
            console.log(msg);
            if (token === null) {
              console.log("problem", msg);
            }
            console.log(token);
            resolve(token);
          });
        });
      }
    }
  }
});

module.exports = mutation;
