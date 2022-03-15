const { APP_URL } = process.env;
const responseHandler = require('../helpers/responseHandler');
const { idValidator, inputValidator } = require('../helpers/validator');
const cusHistoryModel = require('../models/custHistory');
const userModel = require('../models/user');

exports.getCustomerHistory = async (req, res) => {
  try {
    const { id } = req.user;
    let { page, limit } = req.query;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 9;
    const offset = (page - 1) * limit;
    const data = {
      page, limit, offset,
    };
    data.id_user = id;
    const getHistory = await cusHistoryModel.getCustHistory(data);
    if (getHistory.length < 1) {
      return responseHandler(res, 404, null, null, 'No history found', null);
    }
    const getTotal = await cusHistoryModel.totalCustHistory(id);
    const url = `${APP_URL}/customer-history?`;
    const last = Math.ceil(getTotal[0].totalData / limit);
    const pageInfo = {
      prev: page > 1 ? `${url}page=${page - 1}&limit=${limit}` : null,
      next: page < last ? `${url}page=${page + 1}&limit=${limit}` : null,
      totalData: getTotal[0].totalData,
      currentPage: page,
      lastPage: last,
    };
    if (getHistory.length === 1) {
      return responseHandler(res, 200, 'List of histories', [getHistory], null, null);
    }
    return responseHandler(res, 200, 'List of histories', getHistory, null, pageInfo);
  } catch {
    return responseHandler(res, 500, null, null, 'Unexpected error', null);
  }
};

exports.getCustomerCart = async (req, res) => {
  try {
    const { id } = req.user;
    let { page, limit } = req.query;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 9;
    const offset = (page - 1) * limit;
    const data = {
      page, limit, offset,
    };
    data.id_user = id;
    const getCart = await cusHistoryModel.getCustCart(data);
    if (getCart.length < 1) {
      return responseHandler(res, 404, null, null, 'Cart is empty', null);
    }
    const getTotal = await cusHistoryModel.totalCustHistory(id);
    const url = `${APP_URL}/customer-history/cart?`;
    const last = Math.ceil(getTotal[0].totalData / limit);
    const pageInfo = {
      prev: page > 1 ? `${url}page=${page - 1}&limit=${limit}` : null,
      next: page < last ? `${url}page=${page + 1}&limit=${limit}` : null,
      totalData: getTotal[0].totalData,
      currentPage: page,
      lastPage: last,
    };
    if (getCart.length === 1) {
      return responseHandler(res, 200, 'List of histories', [getCart], null, null);
    }
    return responseHandler(res, 200, 'List of histories', getCart, null, pageInfo);
  } catch {
    return responseHandler(res, 500, null, null, 'Unexpected error', null);
  }
};

exports.checkoutCart = async (req, res) => {
  try {
    const { id } = req.params;
    if (!idValidator(id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const fillable = [
      {
        field: 'id_user', required: false, type: 'integer',
      },
      {
        field: 'id_product', required: false, type: 'integer',
      },
      {
        field: 'id_transaction_status', required: false, type: 'integer',
      },
      {
        field: 'quantity', required: false, type: 'integer',
      },
      {
        field: 'payment_method', required: false, type: 'integer',
      },
      {
        field: 'is_delivered', required: false, type: 'boolean',
      },
      {
        field: 'table_number', required: false, type: 'integer',
      },
      {
        field: 'total_price', required: false, type: 'varchar',
      },
    ];
    const { error, data } = inputValidator(req, fillable);
    data.id = id;
    data.id_user = req.user.id;
    if (error.length > 0) {
      return res.status(400).json({
        success: false,
        error,
      });
    }
    if (Object.keys(data).length < 1) {
      return responseHandler(res, 400, null, null, 'Null data', null);
    }
    const checkTransaction = await cusHistoryModel.getCustCartId(data);
    if (checkTransaction.length < 1) {
      return responseHandler(res, 404, null, null, 'Transaction data not found', null);
    }
    if (data.id_user) {
      const checkUser = await userModel.getUser(data.id_user);
      if (checkUser.length < 1) {
        return responseHandler(res, 404, null, null, 'User not found', null);
      }
    }
    const editData = await cusHistoryModel.checkoutCart(data, id);
    if (editData.affectedRows < 1) {
      return responseHandler(res, 500, null, null, 'Unexpected Error!');
    }
    return responseHandler(res, 200, 'Successfully updated data', null, null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {};
    data.id = id;
    data.id_user = req.user.id;
    if (!idValidator(id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const checkTransaction = await cusHistoryModel.getCustHistoryId(data);
    if (checkTransaction.length < 1) {
      return responseHandler(res, 404, null, null, 'Transaction data not found', null);
    }
    const deleteData = await cusHistoryModel.deleteHistory(id);
    if (deleteData.affectedRows < 1) {
      return responseHandler(res, 500, null, null, 'Unexpected Error!');
    }
    return responseHandler(res, 200, 'Successfully deleted data', null, null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};
