const route = require('express').Router();
const responseHandler = require('../helpers/responseHandler');

route.use('/auth', require('./auth'));
route.use('/upload', require('./upload'));

route.get('/', (req, res) => responseHandler(res, 200, 'Backend is running well!'));

module.exports = route;
