const Sequelize = require('sequelize');
const db = require('../db');

const Installation = db.define(
    'installation',
    {
        state: {
            type: Sequelize.ENUM('NOT_STARTED', 'STARTED', 'FINISHED'),
            allowNull: false,
            defaultValue: 'NOT_STARTED',
        },
    },
    {}
);

module.exports = Installation;
