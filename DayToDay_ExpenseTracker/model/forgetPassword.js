const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ForgetPwd = sequelize.define('forgetPwd', {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    uuid: 
    {
        type: Sequelize.STRING(255),
    },
    
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
 }
});

module.exports = ForgetPwd;