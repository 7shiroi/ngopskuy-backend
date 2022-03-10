const productSize = require('express').Router();
const productSizeController = require('../controllers/productSize');

productSize.get('/', productSizeController.getProductSize);
productSize.post('/', productSizeController.postProductSize);
productSize.patch('/', productSizeController.patchProductSize);

module.exports = productSize;
