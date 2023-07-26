const { Sequelize } = require('sequelize');
const Expense = require('../model/expense');
const User = require('../model/Users');


exports.premiumLeaderBoard = async (req, res, next) => {

    try {
     const leadBoardUsers = await User.findAll({
      attributes : ['id', 'name', [Sequelize.fn('sum', Sequelize.col('expenses.amount')), 'total_expense']],
      include: [
        {
            model: Expense,
            attributes: []
        }
      ],
      group: ['user.id'],
      order:[['total_expense', 'DESC']]
     })
    
     res.status(200).json(leadBoardUsers);
     }
    catch(err) {
     console.log(err);
    }
 }