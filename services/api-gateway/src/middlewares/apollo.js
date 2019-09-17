const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
    type Name {
        id: String
        firstName: String
        lastName: String
    }
    type Weather {
        id: String
        summary: String
        date: String
    }

    # The "Query" type is the root of all GraphQL queries.
    type Query {
        weather: Weather
        name(breed: String!): Name
    }
`;

const resolvers = {
    Query: {
        weather: () => ({
            id: '1',
            summary: 'Sunny and warm with graphql!',
            date: new Date().toString(),
        }),
        name: (obj, args, context, info) => ({
            id: '1',
            firstName: 'Kalle + ' + args.breed,
            lastName: 'Anka',
        }),
    },
};

const apolloApi = new ApolloServer({
    typeDefs,
    resolvers,
});

exports.apolloApi = apolloApi;
