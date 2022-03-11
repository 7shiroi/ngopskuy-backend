const route = require('express').Router();
const responseHandler = require('../helpers/responseHandler');

route.use('/promo', require('./promo'));

route.get('/', (req, res) => responseHandler(res, 200, 'Backend is running well!'));

module.exports = route;
