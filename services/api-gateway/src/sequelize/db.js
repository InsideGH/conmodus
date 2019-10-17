const Sequelize = require('sequelize');
const config = require('../config');

const db = new Sequelize(config.POSTGRES_DB, config.POSTGRES_USER, config.POSTGRES_PASSWORD, {
    host: config.POSTGRES_HOST,
    dialect: 'postgres',
});

module.exports = db;
