/* eslint-disable no-console */
const { camelToSnake } = require('../helpers/camelToSnake');
const responseHandler = require('../helpers/responseHandler');

exports.getProductSize = async (req, res) => {
  try {
    responseHandler(res, 200, 'List product size');
  } catch (err) {
    responseHandler(res, 500, 'Unexpected error', null, err);
  }
};

exports.postProductSize = async (req, res) => {
  try {
    const { idProduct, idSize } = req.body;
    let data = {idProduct, idSize}
    data = camelToSnake(data)
    console.log(data);
    responseHandler(res, 200, 'Insert Successfully');
  } catch (err) {
    responseHandler(res, 500, 'Unexpected error', null, err);
  }
};
