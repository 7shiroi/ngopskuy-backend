const route = require('express').Router();
const responseHandler = require('../helpers/responseHandler');

route.get('/', (req, res) => responseHandler(res, 200, 'Backend is running well!'));

module.exports = route;
