const express = require('express');
const router = express.Router();

const passwordController = require('../controller/password');

router.post('/password/forgotpassword',passwordController.forgotPwdEmail);

router.get('/password/resetpassword/:uniqueId',passwordController.resetPassword);

router.get('/password/updateNewPassword/:uniqueId',passwordController.updateNewPassword);

module.exports = router;