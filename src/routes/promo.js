const promo = require('express').Router();
const {
  getPromo, postPromo, patchPromo, deletePromo,
} = require('../controllers/promo');

promo.get('/', getPromo);
promo.post('/', postPromo);
promo.patch('/', patchPromo);
promo.patch('/deleted/', deletePromo);

module.exports = promo;
