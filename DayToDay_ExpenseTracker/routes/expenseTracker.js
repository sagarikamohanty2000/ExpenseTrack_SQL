const express = require('express');

const userController = require('../controller/user');
const expenseController = require('../controller/expense');

const router = express.Router();

router.post('/user/signIn',userController.postUserSignin);

router.post('/user/login',userController.postUserLogin);

router.post('/expense/add-expense',expenseController.postAddExpense);

router.get('/expense/get-expense',expenseController.getAllExpense);

router.delete('/expense/delete/:expenseId',expenseController.deleteExpenseById);

module.exports = router;