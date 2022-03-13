const promo = require('express').Router();
const {
  getPromo, postPromo, patchPromo, deletePromo,
} = require('../controllers/promo');
const { verifyUser } = require('../helpers/auth');

promo.get('/', getPromo);
promo.post('/', verifyUser, postPromo);
promo.patch('/', verifyUser, patchPromo);
promo.patch('/deleted/', verifyUser, deletePromo);

module.exports = promo;
