const product = require('express').Router();
const {
  getProduct, addProduct, editProduct, getProductId, deleteProduct,
} = require('../controller/product');

product.get('/', getProduct);
product.get('/:id', getProductId);
product.post('/', addProduct);
product.patch('/', editProduct);
product.patch('/:id', editProduct);
product.patch('/delete', deleteProduct);
product.patch('/delete/:id', deleteProduct);

module.exports = product;
