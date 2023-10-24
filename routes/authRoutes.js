const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.get('/register', authController.renderRegister);
router.post('/register', authController.handleRegister);
router.get('/login', authController.renderLogin);
router.post('/login', authController.handleLogin);
router.get('/logout', authController.handleLogout);
router.get('/github', authController.githubLogin);
router.get('/github/callback', authController.githubCallback);
router.get('/current', authController.getCurrentUserInfo);

module.exports = router;
