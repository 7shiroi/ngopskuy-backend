const promo = require('express').Router();
const {
  getPromo, postPromo, patchPromo, deletePromo, getPromoById,
} = require('../controllers/promo');
const uploadImage = require('../helpers/upload');
const { verifyUser } = require('../helpers/auth');

promo.get('/', getPromo);
promo.get('/:id', getPromoById);
promo.post('/', verifyUser, uploadImage('image'), postPromo);
promo.patch('/:id', verifyUser, uploadImage('image'), patchPromo);
promo.patch('/delete/:id', verifyUser, deletePromo);

module.exports = promo;
