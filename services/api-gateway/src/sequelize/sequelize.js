const Sequelize = require('sequelize');
const config = require('../config');

console.log("###", config.POSTGRES_DB, config.POSTGRES_USER, config.POSTGRES_PASSWORD, config.POSTGRES_HOST);

const sequelize = new Sequelize(config.POSTGRES_DB, config.POSTGRES_USER, config.POSTGRES_PASSWORD, {
    host: config.POSTGRES_HOST,
    dialect: 'postgres',
});

module.exports = sequelize;
