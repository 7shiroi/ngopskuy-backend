const product = require('express').Router();
const { getProduct, addProduct, editProduct } = require('../controller/product');

product.get('/', getProduct);
product.post('/', addProduct);
product.patch('/', editProduct);
product.patch('/:id', editProduct);

module.exports = product;
