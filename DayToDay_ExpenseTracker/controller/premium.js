const Expense = require('../model/expense');
const User = require('../model/Users');


exports.premiumLeaderBoard = async (req, res, next) => {

    try {
     const users = await User.findAll()
     const expenses = await Expense.findAll();
     const userExpense = {}
 
     expenses.forEach(expense => {
       
       if(userExpense[expense.userId])
       {
         userExpense[expense.userId] +=  expense.amount;
       }
       else
       userExpense[expense.userId] = expense.amount;
     });
 
     var userDeatils = [];
     users.forEach((user) => {
       userDeatils.push({name: user.name, expenseAmount: userExpense[user.id]})
     })
     userDeatils.sort((a,b) => 
       b.expenseAmount - a.expenseAmount
      )
     console.log(userDeatils);
     res.status(200).json(userDeatils);
     }
    catch(err) {
     console.log(err);
    }
 }