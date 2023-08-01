const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Order = sequelize.define('order', {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    paymentId: 
    {
        type: Sequelize.STRING(255),
    },
    orderId: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    status: {
        type: Sequelize.STRING(255),
        allowNull: false
 }
});

module.exports = Order;