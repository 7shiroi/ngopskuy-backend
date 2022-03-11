const promoDeliveryType = require('express').Router();
const promoDeliveryTypeController = require('../controllers/promoDeliveryType');

promoDeliveryType.post('/', promoDeliveryTypeController.postPromoDeliveryType);
promoDeliveryType.patch('/', promoDeliveryTypeController.patchPromoDeliveryType);
promoDeliveryType.delete('/', promoDeliveryTypeController.deletedPromoDeliveryType);

module.exports = promoDeliveryType;
