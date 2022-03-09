const promo = require('express').Router();
const { getPromo, postPromo } = require('../controllers/promo');

promo.get('/', getPromo);
promo.post('/', postPromo);

module.exports = promo;
