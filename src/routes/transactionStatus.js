const transStatus = require('express').Router();
const {
  getTransStatus, addStatus, editStatus, deleteStatus, getTransStatusId,
} = require('../controllers/transactionStatus');

transStatus.get('/', getTransStatus);
transStatus.get('/:id', getTransStatusId);
transStatus.post('/', addStatus);
transStatus.patch('/', editStatus);
transStatus.patch('/:id', editStatus);
transStatus.delete('/', deleteStatus);
transStatus.delete('/:id', deleteStatus);

module.exports = transStatus;
