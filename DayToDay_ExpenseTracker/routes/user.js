const express = require('express');
const router = express.Router();

const userController = require('../controller/user');
const userAuthentication = require('../middleware/auth');


router.post('/user/signIn',userController.postUserSignin);

router.post('/user/login',userController.postUserLogin);

router.get('/user/UserByToken',userAuthentication.authenticate,userController.getUserByToken);

module.exports = router;