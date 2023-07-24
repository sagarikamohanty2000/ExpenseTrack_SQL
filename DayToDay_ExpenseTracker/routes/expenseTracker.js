const express = require('express');

const userController = require('../controller/user');

const router = express.Router();

router.post('/user/signIn',userController.postUserSignin);
router.post('/user/login',userController.postUserLogin);

module.exports = router;