const user = require('express').Router();
const userController = require('../controllers/user');
const { verifyUser } = require('../helpers/auth');
const uploadImage = require('../helpers/upload');

user.get('/', userController.getUsers);
user.post('/', verifyUser, uploadImage('image'), userController.addUser);
user.patch('/:id', verifyUser, uploadImage('image'), userController.editUser);
user.patch('/delete/:id', verifyUser, userController.softDeleteUser);
user.delete('/:id', verifyUser, userController.hardDeleteUser);
user.get('/:id', userController.getUser);

module.exports = user;
