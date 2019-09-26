const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define(
    'user',
    {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {}
);

module.exports = User;
