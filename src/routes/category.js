const category = require('express').Router();
const {
  addCategory, getCategory, editCategory, deleteCategory, getCategoryId,
} = require('../controller/category');

category.get('/', getCategory);
category.get('/:id', getCategoryId);
category.post('/', addCategory);
category.patch('/', editCategory);
category.patch('/:id', editCategory);
category.delete('/', deleteCategory);
category.delete('/:id', deleteCategory);

module.exports = category;
