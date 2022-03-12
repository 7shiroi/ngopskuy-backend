const transactionProduct = require('express').Router();
const transactionProductController = require('../controllers/transactionProduct');

transactionProduct.get('/', transactionProductController.getTransactionProducts);
transactionProduct.get('/:id', transactionProductController.getTransactionProduct);
transactionProduct.post('/', transactionProductController.addTransactionProduct);
transactionProduct.patch('/:id', transactionProductController.editTransactionProduct);
transactionProduct.delete('/:id', transactionProductController.deleteTransactionProduct);

module.exports = transactionProduct;
