const transStatus = require('express').Router();
const {
  getTransStatus, addStatus, editStatus, deleteStatus, getTransStatusId,
} = require('../controllers/transactionStatus');
const { verifyUser } = require('../helpers/auth');

transStatus.get('/', getTransStatus);
transStatus.get('/:id', getTransStatusId);
transStatus.post('/', verifyUser, addStatus);
transStatus.patch('/:id', verifyUser, editStatus);
transStatus.delete('/:id', verifyUser, deleteStatus);

module.exports = transStatus;
