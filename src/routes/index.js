const route = require('express').Router();
const responseHandler = require('../helpers/responseHandler');

<<<<<<< HEAD
route.use('/upload', require('./upload'));
=======
route.use('/promo', require('./promo'));
route.use('/auth', require('./auth'));
route.use('/user', require('./user'));
route.use('/upload', require('./upload'));
route.use('/productSize', require('./productSize'));
>>>>>>> 216b9a6e9b242a19bcb74fa1c54b71629bb7988b

route.get('/', (req, res) => responseHandler(res, 200, 'Backend is running well!'));
route.use('/product', require('./product'));
route.use('/category', require('./category'));
route.use('/size', require('./size'));
route.use('/delivery_type', require('./deliveryType'));
route.use('/prod_delivery_type', require('./productDeliveryType'));

module.exports = route;
