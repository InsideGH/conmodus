if (!process.env.GRAPHQL_ENDPOINT) {
    throw new Error('process.env.GRAPHQL_ENDPOINT not defined!');
}

if (!process.env.API_ENDPOINT) {
    throw new Error('process.env.API_ENDPOINT not defined!');
}

if (!process.env.LOG_LEVEL) {
    throw new Error('process.env.LOG_LEVEL not defined!');
}

if (!process.env.NODE_ENV) {
    throw new Error('process.env.NODE_ENV not defined!');
}

if (!process.env.VERSION) {
    throw new Error('process.env.VERSION not defined!');
}

if (!process.env.POSTGRES_HOST) {
    throw new Error('process.env.POSTGRES_HOST not defined!');
}

if (!process.env.POSTGRES_PASSWORD) {
    throw new Error('process.env.POSTGRES_PASSWORD not defined!');
}

if (!process.env.POSTGRES_USER) {
    throw new Error('process.env.POSTGRES_USER not defined!');
}

if (!process.env.POSTGRES_DB) {
    throw new Error('process.env.POSTGRES_DB not defined!');
}

exports.GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
exports.API_ENDPOINT = process.env.API_ENDPOINT;
exports.LOG_LEVEL = process.env.LOG_LEVEL;
exports.NODE_ENV = process.env.NODE_ENV;
exports.VERSION = process.env.VERSION;
exports.POSTGRES_HOST = process.env.POSTGRES_HOST;
exports.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
exports.POSTGRES_USER = process.env.POSTGRES_USER;
exports.POSTGRES_DB = process.env.POSTGRES_DB;
