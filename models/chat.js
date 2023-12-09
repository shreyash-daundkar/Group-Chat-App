const Sequelize = require('sequelize');
const database = require('../utils/database');

module.exports = database.define('chat', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true,
    },
    message : {
        type : Sequelize.STRING,
    },
    imageUrl : {
        type: Sequelize.STRING,
    }
});