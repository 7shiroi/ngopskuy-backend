const product = require('express').Router();
const uploadImage = require('../helpers/upload');
const {
  getProduct, addProduct, editProduct, getProductId, deleteProduct, getFavoriteProducts,
} = require('../controllers/product');
const { verifyUser } = require('../helpers/auth');

product.get('/', getProduct);
product.get('/favorite', getFavoriteProducts);
product.get('/:id', getProductId);
product.post('/', verifyUser, uploadImage('image'), addProduct);
product.patch('/:id', verifyUser, uploadImage('image'), editProduct);
product.patch('/delete/:id', verifyUser, deleteProduct);

module.exports = product;
