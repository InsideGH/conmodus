const { ApolloServer, gql } = require('apollo-server-express');
const sequelize = require('../sequelize/sequelize');
const models = require('../sequelize/models');

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

    type User {
        id: String
        firstName: String
        lastName: String
    }

    input UserInput {
        firstName: String!
        lastName: String!
    }

    type Query {
        weather: Weather
        name(breed: String!): Name
    }

    type Mutation {
        createUser(input: UserInput!): User
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
    Mutation: {
        createUser: async (obj, { input }, context, info) => {
            const { models } = context;
            const { firstName, lastName } = input;
            const result = await models.User.create({ firstName, lastName });
            return result;
        },
    },
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        sequelize,
        models,
    }),
});

module.exports = apolloServer;
