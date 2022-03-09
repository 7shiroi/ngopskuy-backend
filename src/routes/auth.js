const auth = require('express').Router();
const authController = require('../controllers/auth');

auth.post('/login', authController.login);
auth.post('/register', authController.register);

module.exports = auth;
