const size = require('express').Router();

const {
  getSize, addSize, deleteSize, updateSize, getSizeId,
} = require('../controllers/size');

size.get('/', getSize);
size.get('/:id', getSizeId);
size.post('/', addSize);
size.patch('/', updateSize);
size.patch('/:id', updateSize);
size.delete('/:id', deleteSize);

module.exports = size;
