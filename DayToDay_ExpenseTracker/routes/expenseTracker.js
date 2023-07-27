const express = require('express');

const userController = require('../controller/user');
const expenseController = require('../controller/expense');
const purchaseController = require('../controller/purchase');
const premiumController = require('../controller/premium');
const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.post('/user/signIn',userController.postUserSignin);

router.post('/user/login',userController.postUserLogin);

router.get('/user/UserByToken',userAuthentication.authenticate,userController.getUserByToken);

router.post('/expense/add-expense',userAuthentication.authenticate,expenseController.postAddExpense);

router.get('/expense/get-expense',userAuthentication.authenticate,expenseController.getAllExpense);

router.delete('/expense/delete/:expenseId',userAuthentication.authenticate,expenseController.deleteExpenseById);

router.post('/purchase/updateTransaction',userAuthentication.authenticate,purchaseController.premiumTransaction);

router.get('/purchase/premium',userAuthentication.authenticate,purchaseController.premiumPurchase);

router.get('/premium/leaderBoard',userAuthentication.authenticate,premiumController.premiumLeaderBoard);

module.exports = router;