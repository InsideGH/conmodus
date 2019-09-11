const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
    type Weather {
        id: String
        summary: String
        date: String
    }

    # The "Query" type is the root of all GraphQL queries.
    type Query {
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
};

const apolloApi = new ApolloServer({
    typeDefs,
    resolvers,
});

exports.apolloApi = apolloApi;
