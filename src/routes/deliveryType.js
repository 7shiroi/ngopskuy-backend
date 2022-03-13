const deliveryType = require('express').Router();
const deliveryTypeController = require('../controllers/deliveryType');
const { verifyUser } = require('../helpers/auth');

deliveryType.get('/', deliveryTypeController.getDeliveryTypes);
deliveryType.post('/', verifyUser, deliveryTypeController.addDeliveryType);
deliveryType.patch('/:id', verifyUser, deliveryTypeController.editDeliveryType);
deliveryType.delete('/:id', verifyUser, deliveryTypeController.deleteDeliveryType);
deliveryType.get('/:id', deliveryTypeController.getDeliveryType);

module.exports = deliveryType;
