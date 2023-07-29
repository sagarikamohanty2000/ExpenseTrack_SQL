const express = require('express');
const router = express.Router();

const expenseController = require('../controller/expense');
const userAuthentication = require('../middleware/auth');



router.post('/expense/add-expense',userAuthentication.authenticate,expenseController.postAddExpense);

router.get('/expense/get-expense',userAuthentication.authenticate,expenseController.getAllExpense);

router.get('/expense/downloadFile',userAuthentication.authenticate,expenseController.downloadFile);

router.get('/expense/fileHistory',userAuthentication.authenticate,expenseController.fileHistory);

router.delete('/expense/delete/:expenseId',userAuthentication.authenticate,expenseController.deleteExpenseById);


module.exports = router;