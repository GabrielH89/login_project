const { DataTypes } = require('sequelize');
const db_connection = require('../config/db');

const User = db_connection.define("users", {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = User;