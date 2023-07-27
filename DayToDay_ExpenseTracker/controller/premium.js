const { Sequelize } = require('sequelize');
const Expense = require('../model/expense');
const User = require('../model/Users');


exports.premiumLeaderBoard = async (req, res, next) => {

    try {
     const leadBoardUsers = await User.findAll({
      order:[['totalExpense', 'DESC']]
     })
    
     res.status(200).json(leadBoardUsers);
     }
    catch(err) {
     console.log(err);
    }
 }