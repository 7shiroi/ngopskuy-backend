const auth = require('express').Router();
const authController = require('../controllers/auth');
const { verifyUser } = require('../helpers/auth');

auth.post('/login', authController.login);
auth.post('/register', authController.register);
auth.post('/forgot-password', authController.forgotPass);
auth.post('/verify', verifyUser, authController.verify);

module.exports = auth;
