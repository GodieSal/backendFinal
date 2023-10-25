const express = require('express');
const router = express.Router();
const UserController = require('../dao/controllers/userController');


router.put('/users/premium/:userId', UserController.updateUserRoleToPremium);

module.exports = router;
