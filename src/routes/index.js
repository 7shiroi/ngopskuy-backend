const route = require('express').Router();
const responseHandler = require('../helpers/responseHandler');

route.use('/upload', require('./upload'));

route.get('/', (req, res) => responseHandler(res, 200, 'Backend is running well!'));
route.use('/product', require('./product'));
route.use('/category', require('./category'));
route.use('/size', require('./size'));
route.use('/delivery_type', require('./deliveryType'));
route.use('/prod_delivery_type', require('./productDeliveryType'));
route.use('/transaction_status', require('./transactionStatus'));

module.exports = route;
