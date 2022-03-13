const responseHandler = require('../helpers/responseHandler');
const { inputValidator, idValidator } = require('../helpers/validator');
const transactionProductModel = require('../models/transactionProduct');
const transactionModel = require('../models/transaction');
const productModel = require('../models/product');

exports.getTransactionProducts = async (req, res) => {
  try {
    const getData = await transactionProductModel.getTransactionProducts({});
    if (getData.length < 1) {
      return responseHandler(res, 200, 'Data not available at the moment', null, null, null);
    }
    return responseHandler(res, 200, 'List of Transaction status', getData, null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.getTransactionProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!idValidator(id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const getData = await transactionProductModel.getTransactionProduct(id);
    if (getData.length < 1) {
      return responseHandler(res, 404, null, null, 'Data not found', null);
    }
    return responseHandler(res, 200, 'Transaction status detail', getData[0], null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.addTransactionProduct = async (req, res) => {
  try {
    const fillable = [
      {
        field: 'id_transaction', required: true, type: 'int',
      },
      {
        field: 'id_product', required: true, type: 'int',
      },
      {
        field: 'quantity', required: true, type: 'int',
      },
    ];
    const { error, data } = inputValidator(req, fillable);
    if (error.length > 0) {
      return responseHandler(res, 400, null, null, error);
    }

    const transactionCheck = await transactionModel.getTransactionId(data.id_transaction);
    if (transactionCheck.length === 0) {
      return responseHandler(res, 400, `Transaction with id ${data.id_transaction} is not found!`);
    }
    const productCheck = await productModel.getProductById(data.id_product);
    if (productCheck.length === 0) {
      return responseHandler(res, 400, `Product with id ${data.id_product} is not found!`);
    }
    const transactionProductCheck = await transactionProductModel.checkTransactionProduct(data);
    if (transactionProductCheck.length > 0) {
      return responseHandler(res, 400, 'Data already exist!');
    }
    const addTransactionProductData = await transactionProductModel.addTransactionProduct(data);
    if (addTransactionProductData.affectedRows < 1) {
      return responseHandler(res, 500, null, null, 'Unexpected error');
    }
    const getInsertedData = await transactionProductModel.getTransactionProduct(
      addTransactionProductData.insertId,
    );
    return responseHandler(res, 200, 'Successfully add new transaction status', getInsertedData[0], null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.editTransactionProduct = async (req, res) => {
  try {
    if (!idValidator(req.params.id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }

    const result = await transactionProductModel.getTransactionProduct(req.params.id);
    if (result.length === 0) {
      return responseHandler(res, 400, `Transaction product with id ${req.params.id} is not found`);
    }

    const fillable = [
      {
        field: 'id_transaction', required: false, type: 'int',
      },
      {
        field: 'id_product', required: false, type: 'int',
      },
      {
        field: 'quantity', required: false, type: 'int',
      },
    ];
    const { error, data } = inputValidator(req, fillable);
    if (error.length > 0) {
      return res.status(400).json({
        success: false,
        error,
      });
    }
    data.id = parseInt(req.params.id, 10);

    if (data.id_transaction) {
      const transactionCheck = await transactionModel.getTransactionId(data.id_transaction);
      if (transactionCheck.length === 0) {
        return responseHandler(res, 400, `Transaction with id ${data.id_transaction} is not found!`);
      }
    }
    if (data.id_product) {
      const productCheck = await productModel.getProductById(data.id_product);
      if (productCheck.length === 0) {
        return responseHandler(res, 400, `Product with id ${data.id_product} is not found!`);
      }
    }
    const updateData = {};
    updateData.id_transaction = data.id_transaction
      ? data.id_transaction : result[0].id_transaction;
    updateData.id_product = data.id_product ? data.id_product : result[0].id_product;
    updateData.id = result[0].id;
    const checkTransactionProduct = await transactionProductModel
      .checkTransactionProduct(updateData);
    if (checkTransactionProduct.length > 0) {
      return responseHandler(res, 400, null, null, 'Data already on the list', null);
    }
    const updateTransactionProductData = await transactionProductModel
      .updateTransactionProduct(data.id, data);
    if (updateTransactionProductData.affectedRows < 1) {
      return responseHandler(res, 500, null, null, 'Unexpected Error!');
    }
    const getUpdateData = await transactionProductModel.getTransactionProduct(data.id);
    return responseHandler(res, 200, 'Successfully updated transaction status', getUpdateData[0]);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.deleteTransactionProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!idValidator(id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const result = await transactionProductModel.getTransactionProduct(id);
    if (result.length < 1) {
      return responseHandler(res, 404, null, null, `Data with ID=${id} not found`, null);
    }
    const deleteTransactionProductData = await transactionProductModel.deleteTransactionProduct(id);
    if (deleteTransactionProductData.affectedRows < 1) {
      return responseHandler(res, 500, null, null, 'Unexpected Error!');
    }
    return responseHandler(res, 200, 'Successfully deleted status', result[0]);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};
