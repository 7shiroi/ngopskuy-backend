const deliveryType = require('express').Router();
const deliveryTypeController = require('../controllers/deliveryType');

deliveryType.get('/', deliveryTypeController.getDeliveryTypes);
deliveryType.post('/', deliveryTypeController.addDeliveryType);
deliveryType.patch('/:id', deliveryTypeController.editDeliveryType);
deliveryType.delete('/:id', deliveryTypeController.deleteDeliveryType);
deliveryType.get('/:id', deliveryTypeController.getDeliveryType);

module.exports = deliveryType;
