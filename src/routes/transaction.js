const transaction = require('express').Router();
const {
  getTransaction, addTransaction, editTransaction, deleteTransaction, getTransactionById,
  getTransactionByUser, getTransactionByProduct,
} = require('../controllers/transaction');
const { verifyUser } = require('../helpers/auth');

transaction.get('/', verifyUser, getTransaction);
transaction.get('/user/:id', verifyUser, getTransactionByUser);
transaction.get('/product/:id', verifyUser, getTransactionByProduct);
transaction.get('/:id', verifyUser, getTransactionById);
transaction.post('/', verifyUser, addTransaction);
transaction.patch('/:id', verifyUser, editTransaction);
transaction.patch('/delete/:id', verifyUser, deleteTransaction);

module.exports = transaction;
