const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Name {
        id: String
        firstName: String
        lastName: String
    }

    extend type Query {
        name(breed: String!): Name
    }
`;

const resolvers = {
    Query: {
        name: (obj, args, context, info) => ({
            id: '1',
            firstName: 'Kalle + ' + args.breed,
            lastName: 'Anka',
        }),
    },
    Mutation: {},
};

module.exports = {
    typeDefs,
    resolvers,
};
