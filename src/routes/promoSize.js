const promoSize = require('express').Router();
const promoSizeController = require('../controllers/promoSize');
const { verifyUser } = require('../helpers/auth');

promoSize.get('/', promoSizeController.getPromoSizes);
promoSize.get('/promo/:id', promoSizeController.getPromoSizesByPromo);
promoSize.post('/', promoSizeController.addPromoSize);
promoSize.patch('/:id', verifyUser, promoSizeController.editPromoSize);
promoSize.delete('/:id', verifyUser, promoSizeController.deletePromoSize);
promoSize.get('/:id', verifyUser, promoSizeController.getPromoSize);

module.exports = promoSize;
