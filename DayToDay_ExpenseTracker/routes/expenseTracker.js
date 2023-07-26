const express = require('express');

const userController = require('../controller/user');
const expenseController = require('../controller/expense');
const purchaseController = require('../controller/purchase');
const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.post('/user/signIn',userController.postUserSignin);

router.post('/user/login',userController.postUserLogin);

router.get('/user/UserById/:userId',userController.getUserById);

router.post('/expense/add-expense',userAuthentication.authenticate,expenseController.postAddExpense);

router.get('/expense/get-expense',userAuthentication.authenticate,expenseController.getAllExpense);

router.delete('/expense/delete/:expenseId',userAuthentication.authenticate,expenseController.deleteExpenseById);

router.get('/purchase/premium',userAuthentication.authenticate,purchaseController.premiumPurchase);

router.post('/purchase/updateTransaction',userAuthentication.authenticate,purchaseController.premiumTransaction);

module.exports = router;