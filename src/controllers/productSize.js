/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const { camelToSnake } = require('../helpers/camelToSnake');
const responseHandler = require('../helpers/responseHandler');
const validator = require('../helpers/validator');
const productSizeModel = require('../models/productSize');

exports.getProductSize = async (req, res) => {
  try {
    const result = await productSizeModel.listProductSize();
    if (result.length === 0) {
      responseHandler(res, 404, 'Data not found');
    }
    responseHandler(res, 200, 'List product size', result);
  } catch (err) {
    responseHandler(res, 500, 'Unexpected error', null, err);
  }
};

exports.postProductSize = async (req, res) => {
  try {
    const { idProduct, idSize } = req.body;
    const fillable = [
      {
        field: 'idProduct', required: true, type: 'integer', can_zero: true,
      },
      {
        field: 'idSize', required: true, type: 'integer', can_zero: true,
      },
    ];
    let { error, data } = validator.inputValidator(req, fillable);
    if (error.length > 0) {
      return responseHandler(res, '400', null, error);
    }
    data = camelToSnake(data); // convert variable camel to snake variable
    const resultIdProduct = await productSizeModel.getIdProduct(data);
    if (resultIdProduct.length === 0) {
      return responseHandler(res, 404, 'idProduct not found. Please fill table product first');
    }
    const resultIdSize = await productSizeModel.getIdSize(data);
    if (resultIdSize.length === 0) {
      return responseHandler(res, 404, 'idSize not found. Please fill table size first');
    }
    const resultIsOnlySize = await productSizeModel.isOnlyProductSize(data);
    if (resultIsOnlySize.length > 0) {
      return responseHandler(res, 400, 'Product size from product has been input');
    }
    const post = await productSizeModel.postProductSize(data);
    if (post.affectedRows === 1) {
      const final = await productSizeModel.getData(data);
      return responseHandler(res, 200, 'Insert Successfully', final);
    }
  } catch (err) {
    responseHandler(res, 500, 'Unexpected error', null, err);
  }
};

exports.patchProductSize = async (req, res) => {
  try {
    const { id, idProduct } = req.query;
    const { idSize } = req.body;
    req.body.id = id;
    req.body.idProduct = idProduct;
    const fillable = [
      {
        field: 'id', required: true, type: 'integer', can_zero: false,
      },
      {
        field: 'idProduct', required: true, type: 'integer', can_zero: true,
      },
      {
        field: 'idSize', required: true, type: 'integer', can_zero: true,
      },
    ];
    let { error, data } = validator.inputValidator(req, fillable);
    if (error.length > 0) {
      return responseHandler(res, '400', null, error);
    }
    data = camelToSnake(data); // convert variable camel to snake variable
    const resultId = await productSizeModel.getDataById(id);
    if (resultId.length !== 1) {
      return responseHandler(res, 404, 'id not found');
    }
    if (resultId[0].id_product !== parseInt(idProduct)) {
      return responseHandler(res, 400, 'Please fill correct idProduct');
    }
    const resultIsOnlySize = await productSizeModel.isOnlyProductSize(data);
    if (resultIsOnlySize.length > 0) {
      return responseHandler(res, 400, 'Product size from product has been input');
    }
    const update = await productSizeModel.updateProductSize(data);
    if (update.affectedRows !== 1) {
      return responseHandler(res, 500, 'Updated Failed');
    }
    const final = await productSizeModel.getData(data);
    return responseHandler(res, 200, 'Updated successfully', final);
  } catch (err) {
    return responseHandler(res, 500, 'Unexpected error', null, err);
  }
};

exports.deleteProductSize = async (req, res) => {
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
      return responseHandler(res, '400', null, error);
    }
    const resultId = await productSizeModel.getDataById(id);
    if (resultId.length !== 1) {
      return responseHandler(res, 404, 'id not found');
    }
    const resultDeleted = await productSizeModel.deletedProductSize(id);
    if (resultDeleted.affectedRows !== 1) {
      return responseHandler(res, 500, 'Deleted failed');
    }
    responseHandler(res, 200, 'Deleted successfully', resultId);
  } catch (err) {
    responseHandler(res, 500, 'Unexpected error', null, err);
  }
};
