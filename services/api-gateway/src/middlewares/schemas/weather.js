const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Weather {
        id: String
        summary: String
        date: String
    }

    extend type Query {
        weather: Weather
    }
`;

const resolvers = {
    Query: {
        weather: () => ({
            id: '1',
            summary: 'Sunny and warm with graphql!',
            date: new Date().toString(),
        }),
    },
    Mutation: {},
};

module.exports = {
    typeDefs,
    resolvers,
};
