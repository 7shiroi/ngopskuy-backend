const { APP_URL } = process.env;
const responseHandler = require('../helpers/responseHandler');
const { inputValidator, idValidator } = require('../helpers/validator');
const transactionModel = require('../models/transaction');
const userModel = require('../models/user');

exports.getTransaction = async (req, res) => {
  try {
    let {
      page, limit,
    } = req.query;
    const {
      productSearch, userSearch,
    } = req.query;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 5;
    const url = `${APP_URL}/transaction`;
    const offset = (page - 1) * limit;
    const data = {
      productSearch, userSearch, page, limit, offset,
    };
    const getData = await transactionModel.getTransaction(data);
    if (getData.length < 1) {
      return responseHandler(res, 200, 'Data not available', null, null, null);
    }
    const getTotalData = await transactionModel.totalTransaction(data);
    const total = getTotalData[0].totalData;
    const last = Math.ceil(total / limit);
    const pageInfo = {
      prev: page > 1 ? `${url}?page=${page - 1}&limit=${limit}` : null,
      next: page < last ? `${url}?page=${page + 1}&limit=${limit}` : null,
      page,
      totalData: total,
    };
    return responseHandler(res, 200, 'List of transactions', getData, null, pageInfo);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!idValidator(id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const getData = await transactionModel.getTransactionId(id);
    if (getData.length < 1) {
      return responseHandler(res, 404, null, null, 'Data not found', null);
    }
    return responseHandler(res, 200, 'Transaction detail', getData, null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.getTransactionByUser = async (req, res) => {
  try {
    const { id } = req.params;
    let { page, limit } = req.query;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 5;
    const url = `${APP_URL}/transaction/user/${id}`;
    const offset = (page - 1) * limit;
    const data = {
      id, page, limit, offset,
    };
    if (!idValidator(id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const getData = await transactionModel.getTransactionUser(data);
    if (getData.length < 1) {
      return responseHandler(res, 404, null, null, 'Data not found', null);
    }
    const getTotalData = await transactionModel.totalTransactionUser(data);
    const total = getTotalData[0].totalData;
    const last = Math.ceil(total / limit);
    const pageInfo = {
      prev: page > 1 ? `${url}?page=${page - 1}&limit=${limit}` : null,
      next: page < last ? `${url}?page=${page + 1}&limit=${limit}` : null,
      page,
      totalData: total,
    };
    return responseHandler(res, 200, 'Transaction detail', getData, null, pageInfo);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.getTransactionByProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let { page, limit } = req.query;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 5;
    const url = `${APP_URL}/transaction/product/${id}`;
    const offset = (page - 1) * limit;
    const data = {
      id, page, limit, offset,
    };
    if (!idValidator(id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const getData = await transactionModel.getTransactionProduct(data);
    if (getData.length < 1) {
      return responseHandler(res, 404, null, null, 'Data not found', null);
    }
    const getTotalData = await transactionModel.totalTransactionProduct(data);
    const total = getTotalData[0].totalData;
    const last = Math.ceil(total / limit);
    const pageInfo = {
      prev: page > 1 ? `${url}?page=${page - 1}&limit=${limit}` : null,
      next: page < last ? `${url}?page=${page + 1}&limit=${limit}` : null,
      page,
      totalData: total,
    };
    return responseHandler(res, 200, 'Transaction detail', getData, null, pageInfo);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const fillable = [
      {
        field: 'id_user', required: false, type: 'integer',
      },
      {
        field: 'id_transaction_status', required: true, type: 'integer',
      },
      {
        field: 'payment_method', required: true, type: 'integer',
      },
      {
        field: 'is_delivered', required: true, type: 'boolean',
      },
      {
        field: 'table_number', required: false, type: 'integer',
      },
    ];
    const { error, data } = inputValidator(req, fillable);
    if (error.length > 0) {
      return res.status(400).json({
        success: false,
        error,
      });
    }
    data.id_user = req.user.id;
    if (!data.is_delivered) {
      data.is_delivered = 0;
    }
    if (!data.table_number) {
      data.table_number = 0;
    }
    if (!data.payment_method) {
      data.payment_method = 1;
    }
    data.id_transaction_status = 1;
    const checkUser = await userModel.getUser(data.id_user);
    if (checkUser.length < 1) {
      return responseHandler(res, 404, null, null, 'User not found', null);
    }
    const addNewTransaction = await transactionModel.addTransaction(data);
    if (addNewTransaction.affectedRows === 0) {
      return responseHandler(res, 500, null, null, 'Unexpected error', null);
    }
    const getNewData = await transactionModel.getTransactionId(addNewTransaction.insertId);
    return responseHandler(res, 200, 'Successfully add transaction', getNewData[0], null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.editTransaction = async (req, res) => {
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
    if (error.length > 0) {
      return res.status(400).json({
        success: false,
        error,
      });
    }
    if (Object.keys(data).length < 1) {
      return responseHandler(res, 400, null, null, 'Null data', null);
    }
    const checkTransaction = await transactionModel.getTransactionId(id);
    if (checkTransaction.length < 1) {
      return responseHandler(res, 404, null, null, 'Transaction data not found', null);
    }
    if (data.id_user) {
      const checkUser = await userModel.getUser(data.id_user);
      if (checkUser.length < 1) {
        return responseHandler(res, 404, null, null, 'User not found', null);
      }
    }
    const editData = await transactionModel.editTransaction(data, id);
    if (editData.affectedRows < 1) {
      return responseHandler(res, 500, null, null, 'Unexpected Error!');
    }
    const getUpdatedData = await transactionModel.getTransactionId(id);
    if (getUpdatedData.length < 1) {
      return responseHandler(res, 500, null, null, 'Unexpected Error!');
    }
    return responseHandler(res, 200, 'Successfully updated data', getUpdatedData[0], null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    if (!idValidator(id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const checkTransaction = await transactionModel.getTransactionId(id);
    if (checkTransaction.length < 1) {
      return responseHandler(res, 404, null, null, 'Transaction data not found', null);
    }
    const deleteData = await transactionModel.deleteTransaction(id);
    if (deleteData.affectedRows < 1) {
      return responseHandler(res, 500, null, null, 'Unexpected Error!');
    }
    return responseHandler(res, 200, 'Successfully deleted data', null, null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};
