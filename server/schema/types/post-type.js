const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean
} = graphql;
const gqDateTime = require("graphql-iso-date");
const { GraphQLDateTime } = gqDateTime;
const UserType = require("./user-type");
const CommentType = require("./comment-type");
const Post = require("../../models/post");

const PostType = new GraphQLObjectType({
  name: "PostType",
  fields: {
    id: { type: GraphQLID },
    userId: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    dateTime: {
      type: GraphQLDateTime
    },
    username: {
      type: GraphQLString
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return Post.findComments(parentValue.id);
      }
    }
  }
});

module.exports = PostType;
