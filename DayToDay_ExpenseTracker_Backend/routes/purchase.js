const express = require('express');
const router = express.Router();

const purchaseController = require('../controller/purchase');
const userAuthentication = require('../middleware/auth');


router.post('/purchase/updateTransaction',userAuthentication.authenticate,purchaseController.premiumTransaction);

router.get('/purchase/premium',userAuthentication.authenticate,purchaseController.premiumPurchase);

module.exports = router;