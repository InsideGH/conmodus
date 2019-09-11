require('@babel/polyfill');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const proxy = require('http-proxy-middleware');

import indexHtml from '../html/index.html';
import Client from '../conmodus/client-serverside';
import makeStore from '../client/redux/make-store';

const ssr = require('../conmodus/ssr');

const expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));
const { logger, expressLogger } = require('./logger');
expressApp.use(expressLogger);

expressApp.use('/favicon.ico', express.static(path.join(__dirname, 'assets/favicon.ico')));

if (process.env.NODE_ENV == 'production') {
    expressApp.use('/dist', express.static(path.join(__dirname, '../../dist')));
} else {
    expressApp.use('/dist', proxy({ target: `http://localhost:${config.CONMODUS_BUNDLES_PORT}` }));
}

const ssrConfig = {
    timeout: config.CONMODUS_TIMEOUT,
    maxRenders: config.CONMODUS_MAX_RENDERS,
    indexHtml,
    reactRoot: config.CONMODUS_REACT_ROOT,
    Client,
    makeStore,
};

expressApp.get('*', async (req, res) => {
    try {
        const result = await ssr(req, ssrConfig);

        if (result.redirect) {
            return res.redirect(result.redirect);
        }

        res.send(result.html);
    } catch (error) {
        logger.error(error);
    }
});

const server = expressApp.listen(config.CONMODUS_PORT, err => {
    if (err) {
        throw err;
    }
    logger.info(`ExpressApp started on port ${config.CONMODUS_PORT}`);
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
