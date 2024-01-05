const Sequelize = require('sequelize');
const database = require('../utils/database');

module.exports = database.define('forgotPassword', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
});