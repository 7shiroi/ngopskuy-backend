const promoDeliveryType = require('express').Router();
const promoDeliveryTypeController = require('../controllers/promoDeliveryType');

promoDeliveryType.post('/', promoDeliveryTypeController.postPromoDeliveryType);

module.exports = promoDeliveryType;
