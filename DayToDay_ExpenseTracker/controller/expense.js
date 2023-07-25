const Expense = require('../model/expense');

exports.postAddExpense = async (req,res,next)=>{
    const amount = req.body.amt;
    const description = req.body.description;
    const category = req.body.category;
   try{
    await Expense.create({
        amount: amount,
        description: description,
        category: category
    })
     console.log("EXPENSE ADDED")
     res.status(200).json({
            message:"Successfully added expense "
    })
}
    catch(err) { console.log(err)}
};

exports.getAllExpense = async (req,res,next) => {
    try {
    const expenses = await Expense.findAll()
        console.log("GET CALL");
        res.send(expenses);
    }
    catch(err) { console.log(err)}
};

exports.deleteExpenseById = async (req,res,next) =>{
    const exId = req.params.expenseId;
    try{
    const deleteExpense = await Expense.findByPk(exId)
        console.log(deleteExpense);
        const result = await (deleteExpense.destroy());
        console.log("DESTROYED EXPENSE");
        res.send(result);
    }
    catch(err){console.log(err)}
}