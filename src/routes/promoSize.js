const promoSize = require('express').Router();
const promoSizeController = require('../controllers/promoSize');

promoSize.get('/', promoSizeController.getPromoSizes);
promoSize.post('/', promoSizeController.addPromoSize);
promoSize.patch('/:id', promoSizeController.editPromoSize);
promoSize.delete('/:id', promoSizeController.deletePromoSize);
promoSize.get('/:id', promoSizeController.getPromoSize);

module.exports = promoSize;
