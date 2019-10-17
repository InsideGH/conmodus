const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: String
        email: String
    }

    input UserInput {
        email: String!
        password: String!
    }

    extend type Mutation {
        createUser(input: UserInput!): User
    }
`;

const resolvers = {
    Query: {},
    Mutation: {
        createUser: async (obj, { input }, context, info) => {
            const { models } = context;
            const { email, password } = input;
            const result = await models.User.create({ email, password });
            await new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
            return {
                id: 1,
                email,
            };
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
