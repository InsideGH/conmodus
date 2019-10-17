const { gql } = require('apollo-server-express');
const config = require('../../config');

const merge = require('lodash/merge');
const name = require('./name');
const user = require('./user');
const weather = require('./weather');
const installation = require('./installation');

const rootTypeDefs = gql`
    type Query {
        version: String
    }
    type Mutation {
        _empty: String
    }
`;

const rootResolvers = {
    Query: {
        version: () => config.VERSION,
    },
    Mutation: {
        _empty: () => null,
    },
};

module.exports = {
    typeDefs: [rootTypeDefs, name.typeDefs, user.typeDefs, weather.typeDefs, installation.typeDefs],
    resolvers: merge(rootResolvers, name.resolvers, user.resolvers, weather.resolvers, installation.resolvers),
};
