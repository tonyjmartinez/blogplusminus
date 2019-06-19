const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;
const axios = require("axios");
const PostInputType = require("./types/post-input-type");
const CommentInputType = require("./types/comment-input-type");
const PostController = require("../controllers/post");
const CommentController = require("../controllers/comment");
const UserType = require("./types/user-type");
const PostType = require("./types/post-type");
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
          Auth.signup({ email, password, username }, function(result, msg) {
            if (result === null) {
              return resolve(msg);
            } else {
              jwt = result.jwt;
              refreshToken = result.refreshToken;
            }
            if (jwt === null) {
              reject(msg);
            }
            const expires = new Date();

            expires.setSeconds(expires.getSeconds() + 10);
            return resolve(
              JSON.stringify({
                jwt: jwt,
                refreshToken: refreshToken,
                expires: expires
              })
            );
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
          Auth.login({ email, password }, function(result, msg) {
            if (result === null) {
              return resolve(msg);
            } else {
              jwt = result.jwt;
              refreshToken = result.refreshToken;
            }
            if (jwt === null) {
              return reject(msg);
            }
            const expires = new Date();
            expires.setSeconds(expires.getSeconds() + 10);
            return resolve(
              JSON.stringify({
                jwt: jwt,
                refreshToken: refreshToken,
                expires: expires
              })
            );
          });
        });
      }
    },
    newPost: {
      type: GraphQLString,
      args: {
        input: {
          type: new GraphQLNonNull(PostInputType)
        }
      },
      resolve(parentValue, args) {
        return new Promise((resolve, reject) => {
          PostController.newPost(args).then(function(res) {
            resolve();
          });
        });
      }
    },

    newComment: {
      type: GraphQLString,
      args: {
        input: {
          type: new GraphQLNonNull(CommentInputType)
        }
      },
      resolve(parentValue, args) {
        console.log("new comment mutation")
        return new Promise((resolve, reject) => {
          CommentController.newComment(args).then(function(res) {
            resolve();
          });
        });
      }
    }
  }
});

module.exports = mutation;
