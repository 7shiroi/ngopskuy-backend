const prodDelivery = require('express').Router();
const {
  getProdDelType, addProdDelType, getProdDelTypeId, editProdDelType, deleteProdDelType,
} = require('../controllers/productDeliveryType');
const { verifyUser } = require('../helpers/auth');

prodDelivery.get('/', getProdDelType);
prodDelivery.get('/:id', getProdDelTypeId);
prodDelivery.post('/', verifyUser, addProdDelType);
prodDelivery.patch('/:id', verifyUser, editProdDelType);
prodDelivery.delete('/:id', verifyUser, deleteProdDelType);

module.exports = prodDelivery;
