const Sequelize = require('sequelize');
const database = require('../utils/database');

module.exports = database.define('groupMember', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true,
    },
});