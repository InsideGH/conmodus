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

exports.GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
exports.API_ENDPOINT = process.env.API_ENDPOINT;
exports.LOG_LEVEL = process.env.LOG_LEVEL;
exports.NODE_ENV = process.env.NODE_ENV;
