const responseHandler = require('../helpers/responseHandler');

exports.uploadImage = (req, res) => {
  const data = {};
  if (req.file) {
    data.image = req.file.originalname;
  }
  return responseHandler(res, 200, 'test');
};
