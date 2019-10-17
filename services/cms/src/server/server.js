require('@babel/polyfill');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));
const { logger, expressLogger } = require('./logger');
expressApp.use(expressLogger);

expressApp.use('/favicon.ico', express.static(path.join(__dirname, 'assets/favicon.ico')));
expressApp.use('/', express.static(path.join(__dirname, '../../dist')));

expressApp.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, '../../dist/index.html'));
});

const server = expressApp.listen(80, err => {
    if (err) {
        throw err;
    }
    logger.info(`Frontend ${config.VERSION} started on port 80`);
});

process.on('SIGTERM', function() {
    server.close(function() {
        logger.info('Received SIGTERM - closing');
        process.exit(0);
    });
});

process.on('SIGINT', function() {
    server.close(function() {
        logger.info('Received SIGINT - closing');
        process.exit(0);
    });
});
