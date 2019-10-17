if (!process.env.API_ENDPOINT) {
    throw new Error('process.env.API_ENDPOINT not defined!');
}

if (!process.env.GRAPHQL_ENDPOINT) {
    throw new Error('process.env.GRAPHQL_ENDPOINT not defined!');
}

if (!process.env.VERSION) {
    throw new Error('process.env.VERSION not defined!');
}

export const API_ENDPOINT = process.env.API_ENDPOINT;
export const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
export const VERSION = process.env.VERSION;
