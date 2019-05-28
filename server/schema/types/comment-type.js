const graphql = require("graphql");
const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean
} = graphql;
const gqDateTime = require("graphql-iso-date");
const { GraphQLDateTime } = gqDateTime;
const UserType = require("./user-type");

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  fields: () => ({
    id: { type: GraphQLID },
    userId: {
      type: GraphQLID
    },
    parentCommentId: {
      type: GraphQLID
    },
    postId: {
      type: GraphQLID
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
        return;
      }
    }
  })
});

module.exports = CommentType;
