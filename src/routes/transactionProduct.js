const transactionProduct = require('express').Router();
const transactionProductController = require('../controllers/transactionProduct');
const { verifyUser } = require('../helpers/auth');

transactionProduct.get('/', transactionProductController.getTransactionProducts);
transactionProduct.get('/:id', transactionProductController.getTransactionProduct);
transactionProduct.post('/', verifyUser, transactionProductController.addTransactionProduct);
transactionProduct.patch('/:id', verifyUser, transactionProductController.editTransactionProduct);
transactionProduct.delete('/:id', verifyUser, transactionProductController.deleteTransactionProduct);

module.exports = transactionProduct;
