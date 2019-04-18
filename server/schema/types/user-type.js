const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean
} = graphql;
const PostType = require("./post-type");
const Post = require("../../models/post");
const User = require("../../models/user");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    token: { type: GraphQLString },
    expires: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parentValue) {
        return User.findPosts(parentValue.id);
      }
    }
  }
});

module.exports = UserType;
