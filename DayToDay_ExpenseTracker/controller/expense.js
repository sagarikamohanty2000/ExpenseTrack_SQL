const sequelize = require('../util/database');

const Expense = require('../model/expense');
const User = require('../model/Users');

const postAddExpense = async (req,res,next)=>{
    
    const t = await sequelize.transaction();
    
    const amount = req.body.amt;
    const description = req.body.description;
    const category = req.body.category;
    const userId = req.user.id;
   try{
        await Expense.create({
        amount: amount,
        description: description,
        category: category,
        userId: userId,
        transaction: t
    })
            const expense = Number(req.user.totalExpense) + Number(amount);
            User.update({
                totalExpense: expense},
                {where: {id : userId}, 
                transaction: t
            }).then(async()=>{
                await t.commit();
                console.log("Expense updated");  
            })
            .catch(async (err) => {
                await t.rollback();
                console.log(err);
            })
            res.status(200).json({
            success: true,
            message:"Successfully added expense "
            })
   
   }
    catch(err) { 
        console.log(err)}
}

const getAllExpense = async (req,res,next) => {
    try {
    const expenses = await Expense.findAll({where : {userId : req.user.id}})
        console.log("GET CALL");
      return res.send(expenses);
    }
    catch(err) { console.log(err)}
};

const deleteExpenseById = async (req,res,next) =>{
    
    const t = await sequelize.transaction();
    const exId = req.params.expenseId;
    if(exId == undefined || exId.length === 0)
    {      
            await t.rollback();
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
        await Expense.destroy({where : {id:exId, userId: req.user.id}, transaction: t})
        console.log("DESTROYED EXPENSE");

            Expense.findAll({where: {id: exId}}).then((deleteExpenseInfo) => {
        
                const verifiedExpense = Number(req.user.totalExpense) - Number(deleteExpenseInfo[0].amount);
   
            User.update({
                totalExpense : verifiedExpense},
                 {where: {id : req.user.id}, 
                 transaction: t
                }).then(async()=>{
                    await t.commit();
                    console.log("totalExpense updated after Deletion");  
                })
                .catch(async (err) => {
                    await t.rollback();
                    console.log(err);
                })
        })
        .catch(async (err) => {
            await t.rollback();
            console.log(err);
        })
        res.status(200).json({
        success: true,
        message:"Successfully deleted "
})
    }
    catch(err){console.log(err)}
}


module.exports = {
    postAddExpense,
    getAllExpense,
    deleteExpenseById
}