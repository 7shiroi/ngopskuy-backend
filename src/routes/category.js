const category = require('express').Router();
const {
  addCategory, getCategory, editCategory, deleteCategory,
} = require('../controller/category');

category.get('/', getCategory);
category.post('/', addCategory);
category.patch('/', editCategory);
category.patch('/:id', editCategory);
category.delete('/', deleteCategory);
category.delete('/:id', deleteCategory);

module.exports = category;
