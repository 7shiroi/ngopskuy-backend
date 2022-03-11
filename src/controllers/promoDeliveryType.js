const responseHandler = require('../helpers/responseHandler');

exports.postPromoDeliveryType = async (req, res) => {
  try {
    return responseHandler(res, 200, 'Insert Successfully');
  } catch (err) {
    return responseHandler(res, 500, 'Unexpected error', null, err);
  }
};
