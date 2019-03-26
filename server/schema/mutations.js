const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
} = graphql;
const axios = require('axios');

const UserType = require('./types/user-type');
const Auth = require('../controllers/authentication');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString},
                password: { type: GraphQLString},
                username: { type: GraphQLString }
            },
            resolve(parentValue, { email, password, username}, req) {
                return new Promise(async (resolve, reject) => {
                    const creds = { email, password, username};
                    const res = await axios.post('http://localhost:3090/signup', creds);
                    console.log(res.data);
                    resolve();

                })
            }
        }
    }
});

module.exports = mutation;