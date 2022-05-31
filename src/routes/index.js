const route = require('express').Router();
const cors = require('cors');
const responseHandler = require('../helpers/responseHandler');

const { FRONT_END_URL } = process.env;

const corsOptions = {
  origin: FRONT_END_URL,
};
console.log(FRONT_END_URL);
route.use('/auth', cors(corsOptions), require('./auth'));
route.use('/user', cors(corsOptions), require('./user'));
route.use('/product', cors(corsOptions), require('./product'));
route.use('/product_size', cors(corsOptions), require('./productSize'));
route.use('/product_delivery_type', cors(corsOptions), require('./productDeliveryType'));
route.use('/category', cors(corsOptions), require('./category'));
route.use('/size', cors(corsOptions), require('./size'));
route.use('/delivery_type', cors(corsOptions), require('./deliveryType'));
route.use('/transaction', cors(corsOptions), require('./transaction'));
route.use('/transaction_status', cors(corsOptions), require('./transactionStatus'));
route.use('/transaction_product', cors(corsOptions), require('./transactionProduct'));
route.use('/promo', cors(corsOptions), require('./promo'));
route.use('/promo_delivery_type', cors(corsOptions), require('./promoDeliveryType'));
route.use('/promo_size', cors(corsOptions), require('./promoSize'));
route.use('/profile', cors(corsOptions), require('./profile'));
route.use('/customer-history', require('./custHistory'));

route.get('/', (req, res) => responseHandler(res, 200, 'Backend is running well!'));

module.exports = route;
