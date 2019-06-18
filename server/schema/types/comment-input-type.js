const graphql = require("graphql");
const {
  GraphQLDateTime,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString
} = graphql;

module.exports = new GraphQLInputObjectType({
  name: "CommentInput",
  fields: {
    userId: {
      type: GraphQLID
    },
    parentId: {
      type: GraphQLID
    },
    postId: {
      type: GraphQLID
    },
    content: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    parentType: {
      type: GraphQLString
    },
    token: {
      type: GraphQLString
    }
  }
});
