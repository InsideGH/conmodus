const express = require('express');
const bodyParser = require('body-parser');
const { logger, expressLogger } = require('./logger');
const routes = require('./routes');
const config = require('./config');

const expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(expressLogger);

expressApp.use('/', routes);

const server = expressApp.listen(config.API_GATEWAY_PORT, err => {
    if (err) {
        throw err;
    }
    logger.info(`Api started on port ${config.API_GATEWAY_PORT}`);
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
