const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;

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
    }
  }
});

module.exports = PostType;
