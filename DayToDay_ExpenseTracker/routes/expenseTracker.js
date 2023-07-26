const express = require('express');

const userController = require('../controller/user');
const expenseController = require('../controller/expense');
const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.post('/user/signIn',userController.postUserSignin);

router.post('/user/login',userController.postUserLogin);

router.post('/expense/add-expense',userAuthentication.authenticate,expenseController.postAddExpense);

router.get('/expense/get-expense',userAuthentication.authenticate,expenseController.getAllExpense);

router.delete('/expense/delete/:expenseId',userAuthentication.authenticate,expenseController.deleteExpenseById);

module.exports = router;