const upload = require('express').Router();
const uploadController = require('../controllers/upload');
const uploadImage = require('../helpers/upload');

upload.post('/', uploadImage('image'), uploadController.uploadImage);

module.exports = upload;
