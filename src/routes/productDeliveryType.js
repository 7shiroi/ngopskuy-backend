const prodDelivery = require('express').Router();
const {
  getProdDelType, addProdDelType, getProdDelTypeId, editProdDelType, deleteProdDelType,
} = require('../controllers/productDeliveryType');

prodDelivery.get('/', getProdDelType);
prodDelivery.get('/:id', getProdDelTypeId);
prodDelivery.post('/', addProdDelType);
prodDelivery.patch('/', editProdDelType);
prodDelivery.patch('/:id', editProdDelType);
prodDelivery.patch('/delete/', deleteProdDelType);
prodDelivery.patch('/delete/:id', deleteProdDelType);

module.exports = prodDelivery;
