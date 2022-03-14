const { APP_URL } = process.env;
const isNumber = require('../helpers/checkDataType');
const responseHandler = require('../helpers/responseHandler');
const prodModel = require('../models/productDeliveryType');
const productModel = require('../models/product');
const deliveryModel = require('../models/deliveryType');
const { inputValidator } = require('../helpers/validator');

exports.getProdDelType = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 5;
    const offset = (page - 1) * limit;
    const data = { page, limit, offset };
    const getData = await prodModel.getProdDelType(data);
    if (getData.length < 1) {
      return responseHandler(res, 404, null, null, 'Data not found', null, null);
    }
    const url = `${APP_URL}/prod_delivery_type?`;
    const getTotalData = await prodModel.countProdDelType();
    const last = Math.ceil(getTotalData[0].totalData / limit);
    const pageInfo = {
      prev: page > 1 ? `${url}page=${page - 1}&limit=${limit}` : null,
      next: page < last ? `${url}page=${page + 1}&limit=${limit}` : null,
      currentPage: page,
      lastPage: last,
      totalData: getTotalData[0].totalData,
    };
    return responseHandler(res, 200, 'List of roduct delivery type', getData, null, pageInfo);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected error', null, null);
  }
};

exports.getProdDelTypeId = async (req, res) => {
  try {
    const { id } = req.params;
    if (id < 1 || Number.isNaN(Number(id))) {
      return responseHandler(res, 400, null, null, 'ID should be a number greater than 0', null);
    }
    const getData = await prodModel.getProdDelTypeId(id);
    if (getData.length < 1) {
      return responseHandler(res, 404, null, null, 'Data not found', null);
    }
    return responseHandler(res, 200, 'Detail Product delivery type', getData[0], null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected error', null, null);
  }
};

exports.addProdDelType = async (req, res) => {
  try {
    const fillable = [
      {
        field: 'id_product', required: true, type: 'integer',
      },
      {
        field: 'id_delivery_type', required: true, type: 'integer',
      },
    ];
    const { data, error } = inputValidator(req, fillable);

    if (error.length > 0) {
      return responseHandler(res, 400, null, null, error);
    }
    const checkExist = await prodModel.checkProdDelType(data); // Check if data exist
    if (checkExist.length > 0) {
      return responseHandler(res, 400, null, null, 'Data already on the list', null, null);
    }
    const checkProdId = await productModel.getProductById(data.id_product);// Check if product exist
    if (checkProdId.length < 1) {
      return responseHandler(res, 400, null, null, 'Product didn\'t exist', null);
    }
    const checkDeliveryMethod = await deliveryModel.getDeliveryType(data.id_delivery_type);
    if (checkDeliveryMethod.length < 1) {
      return responseHandler(res, 400, null, null, 'Delivery method didn\'t exist', null);
    }
    const addNewData = await prodModel.addProdDelType(data);
    const getNewData = await prodModel.getProdDelTypeId(addNewData.insertId);
    return responseHandler(res, 201, 'Success', getNewData[0], null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected error', null, null);
  }
};

exports.editProdDelType = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {};
    const dataName = ['idProduct', 'idDeliveryType'];
    if (!id) {
      return responseHandler(res, 400, null, null, 'Undefined ID', null, null);
    }
    if (id < 1 || Number.isNaN(Number(id))) {
      return responseHandler(res, 400, null, null, 'ID should be a number greater than 0', null);
    }
    const getData = await prodModel.getProdDelTypeId(id);
    if (getData.length < 1) {
      return responseHandler(res, 404, null, null, 'Data not found', null);
    }
    dataName.forEach((x) => {
      if (req.body[x]) {
        data[x] = req.body[x];
      } else {
        data[x] = getData[0][x];
      }
    });
    if (Object.keys(data).length < 1) {
      return responseHandler(res, 400, null, null, 'Null data', null);
    }
    const checkNumber = isNumber(data, dataName);
    if (checkNumber > 0) {
      return responseHandler(res, 400, null, null, 'Product ID and Delivery Type ID should be a number', null, null);
    }
    const checkProdId = await productModel.getProductById(data.idProduct); // Check if product exist
    if (checkProdId.length < 1) {
      return responseHandler(res, 404, null, null, 'Product didn\'t exist', null);
    }
    const checkDeliveryMethod = await deliveryModel.getDeliveryType(data.idDeliveryType);
    if (checkDeliveryMethod.length < 1) {
      return responseHandler(res, 404, null, null, 'Delivery method didn\'t exist', null);
    }
    const checkExist = await prodModel.checkProdDelType(data); // Check if product exist
    if (checkExist.length > 0) {
      return responseHandler(res, 400, null, null, 'Data already on the list', null, null);
    }
    const editData = await prodModel.editProdDelType(data, id);
    if (editData.affectedRows < 1) {
      return responseHandler(res, 500, null, null, 'Unexpected error', null, null);
    }
    const getUpdatedData = await prodModel.getProdDelTypeId(id);
    return responseHandler(res, 200, 'Successfully updated data', getUpdatedData[0], null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected error', null, null);
  }
};

exports.deleteProdDelType = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return responseHandler(res, 400, null, null, 'Undefined ID', null, null);
    }
    if (id < 1 || Number.isNaN(Number(id))) {
      return responseHandler(res, 400, null, null, 'ID should be a number greater than 0', null);
    }
    const getData = await prodModel.getProdDelTypeId(id);
    if (getData.length < 1) {
      return responseHandler(res, 404, null, null, 'Data not found', null, null);
    }
    const deleteData = await prodModel.deleteProdDelType(id);
    if (deleteData.affectedRows < 1) {
      return responseHandler(res, 500, null, null, 'Server error', null, null);
    }
    return responseHandler(res, 200, 'Successfully deleted data', null, null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected error', null, null);
  }
};
