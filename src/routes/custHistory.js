const customerHistory = require('express').Router();
const {
  getCustomerHistory, getCustomerCart, checkoutCart, deleteTransaction,
} = require('../controllers/custHistory');
const { verifyUser } = require('../helpers/auth');

customerHistory.get('/', verifyUser, getCustomerHistory);
customerHistory.get('/cart', verifyUser, getCustomerCart);
customerHistory.get('/:id', verifyUser, getCustomerHistory);
customerHistory.patch('/:id', verifyUser, checkoutCart);
customerHistory.patch('/delete/:id', verifyUser, deleteTransaction);

module.exports = customerHistory;
