/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const responseHandler = require('../helpers/responseHandler');
const validator = require('../helpers/validator');
const { camelToSnake } = require('../helpers/camelToSnake');
const promoDeliveryTypeModel = require('../models/promoDeliveryType');

exports.getPromoDeliveryType = async (req, res) => {
  try {
    const result = await promoDeliveryTypeModel.getListPromoDT();
    if (result.length === 0) {
      return responseHandler(res, 404, 'Data not found');
    }
    return responseHandler(res, 200, 'list of data', result);
  } catch (err) {
    return responseHandler(res, 500, 'Unexpected error', null, err);
  }
};
exports.postPromoDeliveryType = async (req, res) => {
  try {
    const { idPromo, idDeliveryType } = req.body;
    const fillable = [
      {
        field: 'idPromo', required: true, type: 'integer', can_zero: false,
      },
      {
        field: 'idDeliveryType', required: true, type: 'integer', can_zero: true,
      },
    ];
    let { error, data } = validator.inputValidator(req, fillable);
    if (error.length > 0) {
      return responseHandler(res, 400, 'Bad request', null, error);
    }
    data = camelToSnake(data);
    const resultIdPromo = await promoDeliveryTypeModel.getIdPromo(data);
    if (resultIdPromo.length === 0) {
      return responseHandler(res, 404, 'idPromo not found. Please fill table promo first');
    }
    const resultIdDeliveryType = await promoDeliveryTypeModel.getIdDeliveryType(data);
    if (resultIdDeliveryType.length === 0) {
      return responseHandler(res, 404, 'idDeliveryType not found. Please fill table delivery_type first');
    }
    const isOnlyOne = await promoDeliveryTypeModel.getIsOnlyOne(data);
    if (isOnlyOne.length !== 0) {
      return responseHandler(res, 400, 'Data has been input');
    }
    const post = await promoDeliveryTypeModel.postPromoDeliveryType(data);
    if (post.affectedRows !== 1) {
      return responseHandler(res, 500, 'Insert Failed');
    }
    const final = await promoDeliveryTypeModel.getData(data);
    return responseHandler(res, 200, 'Insert Successfully', final);
  } catch (err) {
    return responseHandler(res, 500, 'Unexpected error', null, err);
  }
};

exports.patchPromoDeliveryType = async (req, res) => {
  try {
    const { idDeliveryType } = req.body;
    const { id, idPromo } = req.query;
    req.body.id = id;
    req.body.idPromo = idPromo;
    const fillable = [
      {
        field: 'id', required: true, type: 'integer', can_zero: false,
      },
      {
        field: 'idPromo', required: true, type: 'integer', can_zero: false,
      },
      {
        field: 'idDeliveryType', required: true, type: 'integer', can_zero: true,
      },
    ];
    let { error, data } = validator.inputValidator(req, fillable);
    if (error.length > 0) {
      return responseHandler(res, 400, 'Bad request', null, error);
    }
    data = camelToSnake(data);
    const resultId = await promoDeliveryTypeModel.getDataById(data);
    if (resultId.length !== 1) {
      return responseHandler(res, 404, 'Id not found');
    }
    if (resultId[0].id_promo !== parseInt(data.id_promo)) {
      return responseHandler(res, 400, 'Please fill correct idPromo');
    }
    const resultIdPromo = await promoDeliveryTypeModel.getIdPromo(data);
    if (resultIdPromo.length === 0) {
      return responseHandler(res, 404, 'idPromo not found. Please fill table promo first');
    }
    const resultIdDeliveryType = await promoDeliveryTypeModel.getIdDeliveryType(data);
    if (resultIdDeliveryType.length === 0) {
      return responseHandler(res, 404, 'idDeliveryType not found. Please fill table delivery_type first');
    }
    const isOnlyOne = await promoDeliveryTypeModel.getIsOnlyOne(data);
    if (isOnlyOne.length !== 0) {
      return responseHandler(res, 400, 'Data has been Input');
    }
    const update = await promoDeliveryTypeModel.patchPromoDeliveryType(data);
    if (update.affectedRows !== 1) {
      return responseHandler(res, 500, 'Updated Failed');
    }
    const final = await promoDeliveryTypeModel.getData(data);
    return (responseHandler(res, 200, 'Updated Successfully', final));
  } catch (err) {
    console.log(err);
    return responseHandler(res, 500, 'Unexpected Error', null, err);
  }
};

exports.deletedPromoDeliveryType = async (req, res) => {
  try {
    const { id } = req.query;
    req.body.id = id;
    const fillable = [
      {
        field: 'id', required: true, type: 'integer', can_zero: false,
      },
    ];
    let { error, data } = validator.inputValidator(req, fillable);
    if (error.length > 0) {
      return responseHandler(res, 400, 'Bad request', null, error);
    }
    const resultId = await promoDeliveryTypeModel.getDataById(data);
    if (resultId.length === 0) {
      return responseHandler(res, 404, 'Id not found ');
    }
    const resultsDeleted = await promoDeliveryTypeModel.deletedPromoDeliveryType(id);
    console.log(resultsDeleted);
    if (resultsDeleted.affectedRows !== 1) {
      return responseHandler(res, 500, 'Deleted failed');
    }
    return responseHandler(res, 200, 'Deleted successfully', resultId);
  } catch (err) {
    return responseHandler(res, 500, 'Unexpected error', null, err);
  }
};
