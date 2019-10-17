const { gql } = require('apollo-server-express');

const typeDefs = gql`
    enum InstallationState {
        NOT_STARTED
        STARTED
        FINISHED
    }

    type Installation {
        id: String
        state: InstallationState
    }

    extend type Query {
        installation: Installation!
    }

    extend type Mutation {
        installation(state: InstallationState): Installation
    }
`;

const resolvers = {
    Query: {
        installation: async (obj, args, context, info) => {
            const { models } = context;
            const installtion = await models.Installation.findOne();

            await new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });

            if (installtion) {
                return installtion;
            } else {
                throw new Error('Database does not have an installation entry.');
            }
        },
    },
    Mutation: {
        installation: async (obj, { state }, context, info) => {
            const { models } = context;
            const installation = await models.Installation.findOne();
            installation.update({
                state,
            });
            console.log('update installation', installation);
            await new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
            return installation;
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
