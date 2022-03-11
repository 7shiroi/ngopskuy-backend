const user = require('express').Router();
const userController = require('../controllers/user');
const uploadImage = require('../helpers/upload');

user.get('/', userController.getUsers);
user.post('/', uploadImage('image'), userController.addUser);
user.patch('/:id', uploadImage('image'), userController.editUser);
user.patch('/delete/:id', userController.softDeleteUser);
user.delete('/:id', userController.hardDeleteUser);
user.get('/:id', userController.getUser);

module.exports = user;
