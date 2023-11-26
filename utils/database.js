const Sequelize = require('sequelize');

module.exports = new  Sequelize(process.env.MYSQL_DATABASE_NAME, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    dialect: 'mysql', 
    host: process.env.MYSQL_HOST,
});