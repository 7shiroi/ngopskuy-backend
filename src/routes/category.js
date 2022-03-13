const category = require('express').Router();
const {
  addCategory, getCategory, editCategory, deleteCategory, getCategoryId,
} = require('../controllers/category');
const { verifyUser } = require('../helpers/auth');

category.get('/', getCategory);
category.get('/:id', getCategoryId);
category.post('/', verifyUser, addCategory);
category.patch('/:id', verifyUser, editCategory);
category.delete('/:id', verifyUser, deleteCategory);

module.exports = category;
