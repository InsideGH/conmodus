const { ApolloServer } = require('apollo-server-express');
const models = require('../sequelize/models');
const schemas = require('./schemas');

const apolloServer = new ApolloServer({
    typeDefs: schemas.typeDefs,
    resolvers: schemas.resolvers,
    context: ({ req }) => ({
        models,
    }),
});

module.exports = apolloServer;
