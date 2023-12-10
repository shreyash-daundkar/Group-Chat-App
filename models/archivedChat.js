const Sequelize = require('sequelize');
const database = require('../utils/database');

module.exports = database.define('archivedChat', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
    },
    message : {
        type : Sequelize.STRING,
    },
    imageUrl : {
        type: Sequelize.STRING,
    }
});