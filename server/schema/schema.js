const graphql = require('graphql');
const { GraphQLSchema } = graphql;
const mutation = require('./mutations');
const RootType = require('./types/root-type');

module.exports = new GraphQLSchema({
    query: RootType,
    mutation
})