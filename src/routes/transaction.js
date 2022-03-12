const transaction = require('express').Router();
const {
  getTransaction, addTransaction, editTransaction, deleteTransaction, getTransactionById,
  getTransactionByUser, getTransactionByProduct,
} = require('../controllers/transaction');

transaction.get('/', getTransaction);
transaction.get('/user/:id', getTransactionByUser);
transaction.get('/product/:id', getTransactionByProduct);
transaction.get('/:id', getTransactionById);
transaction.post('/', addTransaction);
transaction.patch('/', editTransaction);
transaction.patch('/:id', editTransaction);
transaction.patch('/delete', deleteTransaction);
transaction.patch('/delete/:id', deleteTransaction);

module.exports = transaction;
