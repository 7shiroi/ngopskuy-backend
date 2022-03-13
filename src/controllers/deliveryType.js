const responseHandler = require('../helpers/responseHandler');
const { inputValidator, idValidator } = require('../helpers/validator');
const deliveryTypeModels = require('../models/deliveryType');

const { APP_URL } = process.env;

exports.getDeliveryTypes = async (req, res) => {
  try {
    let { search, page, limit } = req.query;
    search = search || '';
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 5;
    const offset = (page - 1) * limit;
    const data = { search, offset, limit };

    const results = await deliveryTypeModels.getDeliveryTypes(data);
    if (results.length === 0) {
      return responseHandler(res, 200, 'Delivery types list is empty');
    }
    const dataCount = await deliveryTypeModels.getDeliveryTypesCount(data);
    const { rowsCount } = dataCount[0];
    const lastPage = Math.ceil(rowsCount / limit);
    const pageInfo = {
      prev: page > 1 ? `${APP_URL}/delivery_type?search=${search}&page=${page - 1}&limit=${limit}` : null,
      next: page < lastPage ? `${APP_URL}/delivery_type?search=${search}&page=${page + 1}&limit=${limit}` : null,
      totalData: rowsCount,
      currentPage: page,
      lastPage,
    };
    return responseHandler(res, 200, 'Delivery types list', results, null, pageInfo);
  } catch (error) {
    return responseHandler(res, 500, 'Unexpected error!');
  }
};

exports.getDeliveryType = async (req, res) => {
  try {
    if (!idValidator(req.params.id)) {
      return responseHandler(res, 400, null, null, 'Invalid Id Format!');
    }
    const { id } = req.params;
    const results = await deliveryTypeModels.getDeliveryType(id);
    if (results.length === 0) {
      return responseHandler(res, 404, `Delivery type with id ${id} is not found`);
    }
    return responseHandler(res, 200, 'Delivery types list', results[0]);
  } catch (error) {
    return responseHandler(res, 500, 'Unexpected error!');
  }
};

exports.addDeliveryType = async (req, res) => {
  // if (req.user.role > 2) {
  //   return responseHandler(res, 403, null, null, 'You are not authorized to do this action');
  // }
  try {
    const fillable = [
      {
        field: 'name', required: true, type: 'varchar', max_length: 100,
      },
    ];

    const { error, data } = inputValidator(req, fillable);
    if (error.length > 0) {
      return res.status(400).json({
        success: false,
        error,
      });
    }

    const deliveryTypeCheck = await deliveryTypeModels.checkDeliveryType(data.name);
    if (deliveryTypeCheck.length > 0) {
      return responseHandler(res, 400, 'Data already exist!');
    }

    const addDeliveryTypeData = await deliveryTypeModels.addDeliveryType(data);
    if (addDeliveryTypeData.affectedRows === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }
    const insertedData = await deliveryTypeModels.getDeliveryType(addDeliveryTypeData.insertId);
    if (insertedData.length > 0) {
      return responseHandler(res, 200, `${addDeliveryTypeData.affectedRows} delivery type added`, insertedData);
    }
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  } catch (error) {
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};

exports.editDeliveryType = async (req, res) => {
  // if (req.user.role > 2) {
  //   return responseHandler(res, 403, null, null, 'You are not authorized to do this action');
  // }
  try {
    if (!idValidator(req.params.id)) {
      return responseHandler(res, 400, 'Invalid id format!');
    }
    const { id } = req.params;
    const results = await deliveryTypeModels.getDeliveryType(id);
    if (results.length === 0) {
      return responseHandler(res, 400, 'Delivery Type not found');
    }
    const fillable = [
      {
        field: 'name', required: true, type: 'varchar', max_length: 80,
      },
    ];
    const { error, data } = inputValidator(req, fillable);
    if (error.length > 0) {
      return responseHandler(res, 400, null, null, error);
    }

    const deliveryTypeCheck = await deliveryTypeModels.checkDeliveryType(data);
    if (deliveryTypeCheck.length > 0) {
      return responseHandler(res, 400, 'Data already exist!');
    }

    const updateDeliveryTypeData = await deliveryTypeModels.updateDeliveryType(id, data);
    if (updateDeliveryTypeData.affectedRows === 0) {
      return responseHandler(res, 500, null, null, 'Unepected Error');
    }
    const updatedData = await deliveryTypeModels.getDeliveryType(id);
    if (updatedData.length > 0) {
      return responseHandler(res, 200, `Delivery type with id ${id} has been updated`, updatedData[0]);
    }
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  } catch (error) {
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};

exports.deleteDeliveryType = async (req, res) => {
  // if (req.user.role > 2) {
  //   return responseHandler(res, 403, null, null, 'You are not authorized to do this action');
  // }
  try {
    if (!idValidator(req.params.id)) {
      return responseHandler(res, 400, null, null, 'Invalid Id Format!');
    }
    const { id } = req.params;

    const deliveryTypeData = await deliveryTypeModels.getDeliveryType(id);
    if (deliveryTypeData.length === 0) {
      return responseHandler(res, 400, null, null, `Delivery type with id ${id} is not found`);
    }

    const deleteDeliveryTypeData = await deliveryTypeModels.deleteDeliveryType(id);
    if (deleteDeliveryTypeData.affectedRows === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected Error');
    }
    return responseHandler(res, 200, `Delivery Type with id ${id} has been deleted`, deliveryTypeData);
  } catch (error) {
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};
