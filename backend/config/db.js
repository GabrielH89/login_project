const {Sequelize} = require('sequelize');
require('dotenv').config();

const db_connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

try {
    db_connection.authenticate();
    console.log("Connected")
}catch(err) {
    console.log("This error ocurred: " + err);
}

module.exports = db_connection;


