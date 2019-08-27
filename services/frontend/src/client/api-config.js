export const API_GATEWAY = process.env.API_GATEWAY;

if (!API_GATEWAY) {
    throw new Error('process.env.API_GATEWAY not defined!');
}
