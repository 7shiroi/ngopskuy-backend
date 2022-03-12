const profile = require('express').Router();
const profileController = require('../controllers/profile');
const { verifyUser } = require('../helpers/auth');
const uploadImage = require('../helpers/upload');

profile.get('/', verifyUser, profileController.getProfile);
profile.patch('/', uploadImage('image'), verifyUser, profileController.updateProfile);
profile.patch('/change_password', verifyUser, profileController.changePassword);

module.exports = profile;
