const express = require('express');
const router = express.Router();

const premiumController = require('../controller/premium');
const userAuthentication = require('../middleware/auth');

router.get('/premium/leaderBoard',userAuthentication.authenticate,premiumController.premiumLeaderBoard);

module.exports = router;