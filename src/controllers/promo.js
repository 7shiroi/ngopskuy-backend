const responseHandler = require('../helpers/responseHandler');
const promoModel = require('../models/promo');

exports.getPromo = async (req, res) => {
  try {
    const results = await promoModel.getPromo();
    if (results.length > 0) {
      responseHandler(res, 'List of promo', results);
    } else {
      responseHandler(res, 'Data not found', null, null, null, 404);
    }
  } catch (err) {
    responseHandler(res, 'Unexpeceted error', null, err, null, 500);
  }
};

exports.postPromo = async (req, res) => {
  try {
    responseHandler(res, 'Insert Successfully');
  } catch (err) {
    responseHandler(res, 'Unexpected Error', null, err, null, 500);
  }
};
