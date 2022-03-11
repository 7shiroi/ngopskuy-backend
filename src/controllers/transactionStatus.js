const responseHandler = require('../helpers/responseHandler');
const { inputValidator, idValidator } = require('../helpers/validator');
const transStatusModel = require('../models/transactionStatus');

exports.getTransStatus = async (req, res) => {
  try {
    const getData = await transStatusModel.getStatus();
    if (getData.length < 1) {
      return responseHandler(res, 200, 'Data not available at the moment', null, null, null);
    }
    return responseHandler(res, 200, 'List of Transaction status', getData, null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.getTransStatusId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!idValidator(id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const getData = await transStatusModel.getStatusId(id);
    if (getData.length < 1) {
      return responseHandler(res, 404, null, null, 'Data not found', null);
    }
    return responseHandler(res, 200, 'Transaction status detail', getData[0], null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.addStatus = async (req, res) => {
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
    const checkStatus = await transStatusModel.getStatusName(data);
    if (checkStatus.length > 0) {
      return responseHandler(res, 400, null, null, 'Data already on the list', null);
    }
    const addNewStatus = await transStatusModel.addStatus(data);
    if (addNewStatus.affectedRows < 1) {
      return responseHandler(res, 500, null, null, 'Unexpected error');
    }
    const getNewStatus = await transStatusModel.getStatusId(addNewStatus.insertId);
    return responseHandler(res, 200, 'Successfully add new transaction status', getNewStatus[0], null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.editStatus = async (req, res) => {
  try {
    if (!idValidator(req.params.id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
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
    data.id = parseInt(req.params.id, 10);
    const getStatus = await transStatusModel.getStatusId(data.id);
    if (getStatus.length < 1) {
      return responseHandler(res, 404, null, null, `Data with ID=${data.id} not found`, null);
    }
    const checkStatus = await transStatusModel.getStatusName(data);
    if (checkStatus.length > 0) {
      return responseHandler(res, 400, null, null, 'Data already on the list', null);
    }
    const updateStatus = await transStatusModel.editStatus(data, data.id);
    if (updateStatus.affectedRows < 1) {
      return responseHandler(res, 500, null, null, 'Unexpected Error!');
    }
    const getNewStatus = await transStatusModel.getStatusId(data.id);
    return responseHandler(res, 200, 'Successfully updated transaction status', getNewStatus, null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};

exports.deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!idValidator(id)) {
      return responseHandler(res, 400, null, null, 'Invalid id format');
    }
    const getStatus = await transStatusModel.getStatusId(id);
    if (getStatus.length < 1) {
      return responseHandler(res, 404, null, null, `Data with ID=${id} not found`, null);
    }
    const deleteStatus = await transStatusModel.deleteStatus(id);
    if (deleteStatus.affectedRows < 1) {
      return responseHandler(res, 500, null, null, 'Unexpected Error!');
    }
    return responseHandler(res, 200, 'Successfully deleted status', null, null, null);
  } catch (err) {
    return responseHandler(res, 500, null, null, 'Unexpected Error!');
  }
};
