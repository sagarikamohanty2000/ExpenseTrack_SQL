const Expense = require('../model/expense');
const User = require('../model/Users');

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
    }).then((result) => {
        const expense = Number(req.user.totalExpense) + Number(amount);
    // })
    // const oldExpense = await User.findOne({ 
    //     where : {id : userId},
    //     attributes : ['totalExpense']
    // })
    //         console.log("OLD EXPENSE >>>>>>>>>>>>>>>>>>>>>>>>>>>>"+oldExpense);
    //         let expense = 0; 
    //         if(oldExpense === undefined || oldExpense === null)
    //         {
    //         expense = amount; 
    //         }
    //         else{
    //             expense = oldExpense+ amount;
    //             }
         console.log("EXPENSE ADDED")
         console.log("EXPENSE AMOUNT >>>> "+expense);
         User.findOne({where: {id : userId}}).then((user) =>{
            user.update({totalExpense: expense}).then(()=>{
                console.log("Expense updated");  
                return res.status(200).json({success :  true});  
            })
            .catch((err) => {
                console.log(err);
            })
         })
         .catch((err) => {
             console.log(err);
         })

            res.status(200).json({
            success: true,
            message:"Successfully added expense "
    })
})
   }
    catch(err) { console.log(err)}
}

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