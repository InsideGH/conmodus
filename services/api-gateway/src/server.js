module.exports = () => {
    const express = require('express');
    const bodyParser = require('body-parser');
    const { logger, expressLogger } = require('./logger');
    const routes = require('./routes');
    const config = require('./config');
    const apolloServer = require('./middlewares/apollo');
    const db = require('./sequelize/db');

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
            db.close();
            process.exit(0);
        });
    });

    process.on('SIGINT', function() {
        logger.info('Received SIGINT - closing');
        server.close(function() {
            logger.info('Received SIGINT - closed');
            db.close();
            process.exit(0);
        });
    });
};
