const { DataTypes } = require('sequelize');
const db_connection = require('../config/db');

const User = db_connection.define("user", {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    }
})

module.exports = User;