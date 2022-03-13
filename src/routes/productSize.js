const productSize = require('express').Router();
const productSizeController = require('../controllers/productSize');
const { verifyUser } = require('../helpers/auth');

productSize.get('/', productSizeController.getProductSize);
productSize.post('/', verifyUser, productSizeController.postProductSize);
productSize.patch('/', verifyUser, productSizeController.patchProductSize);
productSize.delete('/', verifyUser, productSizeController.deleteProductSize);

module.exports = productSize;
