const auth = require('express').Router();
const authController = require('../controllers/auth');

auth.post('/login', authController.login);
auth.post('/register', authController.register);
auth.post('/forgotPass', authController.forgotPass);
auth.post('/verify', authController.verify);

module.exports = auth;
