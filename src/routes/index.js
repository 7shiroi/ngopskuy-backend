const route = require('express').Router();
const responseHandler = require('../helpers/responseHandler');

route.use('/upload', require('./upload'));
route.use('/promo', require('./promo'));
route.use('/auth', require('./auth'));
route.use('/user', require('./user'));
route.use('/upload', require('./upload'));
route.use('/product_size', require('./productSize'));
route.use('/promo_size', require('./promoSize'));
route.use('/product', require('./product'));
route.use('/category', require('./category'));
route.use('/size', require('./size'));
route.use('/delivery_type', require('./deliveryType'));
route.use('/prod_delivery_type', require('./productDeliveryType'));
route.use('/transaction_status', require('./transactionStatus'));
route.use('/transaction', require('./transaction'));
route.use('/transaction_product', require('./transactionProduct'));
route.use('/promo_delivery_type', require('./promoDeliveryType'));
route.use('/profile', require('./profile'));

route.get('/', (req, res) => responseHandler(res, 200, 'Backend is running well!'));

module.exports = route;
