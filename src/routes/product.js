const product = require('express').Router();
const uploadImage = require('../helpers/upload');
const {
  getProduct, addProduct, editProduct, getProductId, deleteProduct, getFavoriteProducts,
} = require('../controllers/product');

product.get('/', getProduct);
product.get('/favorite', getFavoriteProducts);
product.get('/:id', getProductId);
product.post('/', uploadImage('image'), addProduct);
product.patch('/', editProduct);
product.patch('/:id', uploadImage('image'), editProduct);
product.patch('/delete', deleteProduct);
product.patch('/delete/:id', deleteProduct);

module.exports = product;
