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
          Auth.signup({ email, password, username }, function(token, msg) {
            if (token === null) {
              reject(msg);
            }
            resolve(token);
          });
        });
      }
    },
    login: {
      type: GraphQLString,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return new Promise((resolve, reject) => {
          Auth.login({ email, password }, function(token, msg) {
            if (token === null) {
              reject(msg);
            }
            resolve(token);
          });
        });
      }
    }
  }
});

module.exports = mutation;
