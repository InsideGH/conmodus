const express = require('express');
const bodyParser = require('body-parser');
const { logger, expressLogger } = require('./logger');
const routes = require('./routes');
const config = require('./config');
const { apolloApi } = require('./middlewares/apollo');

const expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(expressLogger);

apolloApi.applyMiddleware({ app: expressApp, path: config.GRAPHQL_ENDPOINT });
expressApp.use(config.API_ENDPOINT, routes);

const server = expressApp.listen(80, err => {
    if (err) {
        throw err;
    }
    logger.info(`Api ${config.VERSION} started on port 80`);
});

process.on('SIGTERM', function() {
    logger.info('Received SIGTERM - closing');
    server.close(function() {
        logger.info('Received SIGTERM - closed');
        process.exit(0);
    });
});

process.on('SIGINT', function() {
    logger.info('Received SIGINT - closing');
    server.close(function() {
        logger.info('Received SIGINT - closed');
        process.exit(0);
    });
});
