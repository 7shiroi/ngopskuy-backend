const responseHandler = require('../helpers/responseHandler');

exports.getHome = (req, res) => {
  responseHandler(res, 200, 'Backend is running well');
};
