const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const gqDateTime = require("graphql-iso-date");
const { GraphQLDateTime } = gqDateTime;
const UserType = require("./user-type");

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
    }
  }
});

module.exports = PostType;
