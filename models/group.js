const Sequelize = require('sequelize');
const database = require('../utils/database');

module.exports = database.define('group', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true,
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    adminId : {
        type : Sequelize.INTEGER,
        allowNull : false,
    },
});