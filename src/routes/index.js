const route = require('express').Router();
const responseHandler = require('../helpers/responseHandler');

route.use('/upload', require('./upload'));
route.use('/promo', require('./promo'));
route.use('/auth', require('./auth'));
route.use('/user', require('./user'));
route.use('/upload', require('./upload'));
route.use('/productSize', require('./productSize'));

route.use('/product', require('./product'));
route.use('/category', require('./category'));
route.use('/size', require('./size'));
route.use('/delivery_type', require('./deliveryType'));
route.use('/prod_delivery_type', require('./productDeliveryType'));
route.use('/promo_delivery_type', require('./promoDeliveryType'));


route.get('/', (req, res) => responseHandler(res, 200, 'Backend is running well!'));

module.exports = route;
