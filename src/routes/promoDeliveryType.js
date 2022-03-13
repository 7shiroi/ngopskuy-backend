const promoDeliveryType = require('express').Router();
const promoDeliveryTypeController = require('../controllers/promoDeliveryType');
const { verifyUser } = require('../helpers/auth');

promoDeliveryType.get('/', promoDeliveryTypeController.getPromoDeliveryType);
promoDeliveryType.post('/', verifyUser, promoDeliveryTypeController.postPromoDeliveryType);
promoDeliveryType.patch('/', verifyUser, promoDeliveryTypeController.patchPromoDeliveryType);
promoDeliveryType.delete('/', verifyUser, promoDeliveryTypeController.deletedPromoDeliveryType);

module.exports = promoDeliveryType;
