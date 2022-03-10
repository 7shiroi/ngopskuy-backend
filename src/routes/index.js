const route = require('express').Router();
const responseHandler = require('../helpers/responseHandler');

route.use('/auth', require('./auth'));

route.get('/', (req, res) => responseHandler(res, 200, 'Backend is running well!'));

route.use('/auth', require('./auth'));

route.use('/user', require('./user'));

route.use('/profil', require('./profil'));

module.exports = route;
