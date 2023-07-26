const Expense = require('../model/expense');

exports.postAddExpense = async (req,res,next)=>{
    const amount = req.body.amt;
    const description = req.body.description;
    const category = req.body.category;
    const userId = req.user.id;
   try{
    await Expense.create({
        amount: amount,
        description: description,
        category: category,
        userId: userId
    })
     console.log("EXPENSE ADDED")
     res.status(200).json({
            success: true,
            message:"Successfully added expense "
    })
}
    catch(err) { 
        console.log(err)}
};

exports.getAllExpense = async (req,res,next) => {
    try {
    const expenses = await Expense.findAll({where : {userId : req.user.id}})
        console.log("GET CALL");
      return res.send(expenses);
    }
    catch(err) { console.log(err)}
};

exports.deleteExpenseById = async (req,res,next) =>{
    const exId = req.params.expenseId;
    if(exId == undefined || exId.length === 0)
    {
        res.status(400).json({
            error : {
            success: false,
            message:"No such item exists"
            }
        })
    }
    try{
   // const deleteExpense = await Expense.findAll({where : {id:exId, userId: req.user.id}})
     //   console.log(deleteExpense);
        //const result = await (deleteExpense[0].destroy());
        await Expense.destroy({where : {id:exId, userId: req.user.id}})
        console.log("DESTROYED EXPENSE");
       res.status(200).json({
        success: true,
        message:"Successfully deleted "
})
    }
    catch(err){console.log(err)}
}