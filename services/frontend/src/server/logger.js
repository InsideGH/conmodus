const pino = require('pino');
const expressPino = require('express-pino-logger');
const config = require('./config');

const logger = pino({ level: config.LOG_LEVEL });

exports.logger = logger;
exports.expressLogger = expressPino({ logger });
