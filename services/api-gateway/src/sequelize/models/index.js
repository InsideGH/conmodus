const sequelize = require('../sequelize');

const User = require('./user');

sequelize.sync();

module.exports = {
    User,
};
