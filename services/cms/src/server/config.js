if (!process.env.NODE_ENV) {
    throw new Error('process.env.NODE_ENV not defined!');
}
if (!process.env.LOG_LEVEL) {
    throw new Error('process.env.LOG_LEVEL not defined!');
}
if (!process.env.VERSION) {
    throw new Error('process.env.VERSION not defined!');
}

exports.NODE_ENV = process.env.NODE_ENV;
exports.LOG_LEVEL = process.env.LOG_LEVEL;
exports.VERSION = process.env.VERSION;
