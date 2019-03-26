const graphql = require('graphql');
const { GraphQLObjectType } = graphql;
const UserType = require('./user-type');

const RootType = new GraphQLObjectType({
    name: 'RootType',
    fields: {
        user: {
            type: UserType,
            resolve(parentValue, args, req) {
                return req.user;
            }
        }
    }
});

module.exports = RootType;