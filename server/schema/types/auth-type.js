const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = graphql;
const UserType = require('./user-type');

const AuthType = new GraphQLObjectType({
    name: 'AuthType',
    fields: {
        token: { type: GraphQLString },
        user: { type: UserType}
    }
});

module.exports = AuthType;