const graphql = require("graphql");
const { GraphQLInputObjectType, GraphQLID, GraphQLString } = graphql;

module.exports = new GraphQLInputObjectType({
  name: "PostInput",
  fields: () => ({
    userId: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    token: {
      type: GraphQLString
    }
  })
});
