const express = require('express');
const bodyParser = require('body-parser');
const { logger, expressLogger } = require('./logger');
const routes = require('./routes');
const config = require('./config');
const apolloServer = require('./middlewares/apollo');
const sequelize = require('./sequelize/sequelize');
const tryConnect = require('./sequelize/try-connect');

tryConnect({
    tries: 10,
    delay: 1000,
    test: i =>
        new Promise(async (resolve, reject) => {
            try {
                await sequelize.authenticate();
                logger.info(`Postgres connection OK.`);
                resolve();
            } catch (error) {
                logger.info(`Postgres connection ${i} failed. Trying again soon...`);
                reject(error);
            }
        }),
})
    .then(() => {
        const app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(expressLogger);

        apolloServer.applyMiddleware({ app: app, path: config.GRAPHQL_ENDPOINT });
        app.use(config.API_ENDPOINT, routes);

        const server = app.listen(80, err => {
            if (err) {
                throw err;
            }
            logger.info(`Api ${config.VERSION} started on port 80`);
        });

        process.on('SIGTERM', function() {
            logger.info('Received SIGTERM - closing');
            server.close(function() {
                logger.info('Received SIGTERM - closed');
                sequelize.close();
                process.exit(0);
            });
        });

        process.on('SIGINT', function() {
            logger.info('Received SIGINT - closing');
            server.close(function() {
                logger.info('Received SIGINT - closed');
                sequelize.close();
                process.exit(0);
            });
        });
    })
    .catch(error => {
        logger.error(error);
        sequelize.close();
        process.exit(1);
    });
