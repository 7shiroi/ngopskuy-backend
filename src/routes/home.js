const home = require('express').Router();
const { getHome } = require('../controllers/home');

home.get('/', getHome);

module.exports = home;
