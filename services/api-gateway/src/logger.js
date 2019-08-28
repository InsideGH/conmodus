const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

exports.logger = logger;
exports.expressLogger = expressPino({ logger });
