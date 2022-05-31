const route = require('express').Router();
const responseHandler = require('../helpers/responseHandler');

route.use('/auth', require('./auth'));
route.use('/user', require('./user'));
route.use('/product', require('./product'));
route.use('/product_size', require('./productSize'));
route.use('/product_delivery_type', require('./productDeliveryType'));
route.use('/category', require('./category'));
route.use('/size', require('./size'));
route.use('/delivery_type', require('./deliveryType'));
route.use('/transaction', require('./transaction'));
route.use('/transaction_status', require('./transactionStatus'));
route.use('/transaction_product', require('./transactionProduct'));
route.use('/promo', require('./promo'));
route.use('/promo_delivery_type', require('./promoDeliveryType'));
route.use('/promo_size', require('./promoSize'));
route.use('/profile', require('./profile'));
route.use('/customer-history', require('./custHistory'));

route.get('/', (req, res) => responseHandler(res, 200, 'Backend is running well!'));

module.exports = route;
