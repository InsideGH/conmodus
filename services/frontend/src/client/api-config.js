export const API_GATEWAY = process.env.API_GATEWAY;
export const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;

if (!API_GATEWAY) {
    throw new Error('process.env.API_GATEWAY not defined!');
}

if (!GRAPHQL_ENDPOINT) {
    throw new Error('process.env.GRAPHQL_ENDPOINT not defined!');
}
