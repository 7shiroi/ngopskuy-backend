const route = require('express').Router();

route.use('/', require('./home'));
route.use('/promo', require('./promo'));

module.exports = route;
