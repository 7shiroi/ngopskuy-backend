const size = require('express').Router();

const {
  getSize, addSize, deleteSize, updateSize, getSizeId,
} = require('../controllers/size');
const { verifyUser } = require('../helpers/auth');

size.get('/', getSize);
size.get('/:id', getSizeId);
size.post('/', verifyUser, addSize);
size.patch('/:id', verifyUser, updateSize);
size.delete('/:id', verifyUser, deleteSize);

module.exports = size;
