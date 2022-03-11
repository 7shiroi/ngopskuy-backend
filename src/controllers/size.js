const responseHandler = require('../helpers/responseHandler');
const { inputValidator } = require('../helpers/validator');
const sizeModel = require('../models/size');

exports.getSize = async (req, res) => {
  const getData = await sizeModel.getSize();
  if (getData.length < 1) {
    return responseHandler(res, 404, null, null, 'Data not found', null);
  }
  return responseHandler(res, 200, 'Size list', getData, null, null);
};

exports.getSizeId = async (req, res) => {
  const { id } = req.params;
  if (id < 1 || Number.isNaN(Number(id))) {
    return responseHandler(res, 400, null, null, 'ID should be a number greater than 0', null);
  }
  const getData = await sizeModel.getSizeId(id);
  if (getData.length < 1) {
    return responseHandler(res, 404, null, null, 'Size not found', null);
  }
  return responseHandler(res, 200, 'Size detail', getData[0], null, null);
};

exports.addSize = async (req, res) => {
  const fillable = [
    {
      field: 'name', required: true, type: 'varchar', max_length: 100,
    },
    {
      field: 'label', required: true, type: 'varchar', max_length: 5,
    },
    {
      field: 'description', required: true, type: 'text',
    },
  ];
  const { data, error } = inputValidator(req, fillable);
  if (error.length > 0) {
    return responseHandler(res, 400, null, null, error);
  }
  const checkSize = await sizeModel.getSizeName(data.name);
  if (checkSize.length > 0) {
    return responseHandler(res, 400, null, null, 'Size already on the list', null);
  }
  const postNewSize = await sizeModel.addSize(data);
  if (postNewSize.affectedRows < 1) {
    return responseHandler(res, 500, null, null, 'Server error', null);
  }
  const getNewSize = await sizeModel.getSizeId(postNewSize.insertId);
  if (getNewSize.length < 1) {
    return responseHandler(res, 500, null, null, 'Server error', null);
  }
  return responseHandler(res, 200, 'Successfully add new size', getNewSize[0], null, null);
};

exports.updateSize = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return responseHandler(res, 400, null, null, 'Undefined ID', null);
  }
  const fillable = [
    {
      field: 'name', required: false, type: 'varchar', max_length: 100,
    },
    {
      field: 'label', required: false, type: 'varchar', max_length: 5,
    },
    {
      field: 'description', required: false, type: 'text',
    },
  ];
  const { data, error } = inputValidator(req, fillable);
  if (error.length > 0) {
    return responseHandler(res, 400, null, null, error);
  }
  if (id < 1 || Number.isNaN(Number(id))) {
    return responseHandler(res, 400, null, null, 'ID should be a number greater than 0', null);
  }
  if (Object.keys(data).length < 1) {
    return responseHandler(res, 400, null, null, 'New data should not be empty', null);
  }
  const checkID = await sizeModel.getSizeId(id);
  if (checkID.length < 1) {
    return responseHandler(res, 400, null, null, 'Size not found', null);
  }
  if (data.name) {
    const checkSize = await sizeModel.getSizeName(data.name);
    if (checkSize.length > 0 && checkSize[0].id !== parseInt(id, 10)) {
      return responseHandler(res, 400, null, null, 'Size already on the list', null);
    }
  }
  const updateData = await sizeModel.updateSize(data, id);
  if (updateData.affectedRows < 1) {
    return responseHandler(res, 500, null, null, 'Server error', null);
  }
  const getUpdatedData = await sizeModel.getSizeId(id);
  if (getUpdatedData.length < 1) {
    return responseHandler(res, 500, null, null, 'Server error', null);
  }
  return responseHandler(res, 200, 'Successfully update size', getUpdatedData[0], null, null);
};

exports.deleteSize = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return responseHandler(res, 400, null, null, 'Undefined ID', null);
  }
  if (id < 1 || Number.isNaN(Number(id))) {
    return responseHandler(res, 400, null, null, 'ID should be a number greater than 0', null);
  }
  const checkID = await sizeModel.getSizeId(id);
  if (checkID.length < 1) {
    return responseHandler(res, 404, null, null, 'Size not found', null);
  }
  const deleteData = await sizeModel.deleteSize(id);
  if (deleteData.affectedRows < 1) {
    return responseHandler(res, 500, null, null, 'Server error', null);
  }
  return responseHandler(res, 200, 'Successfully deleted data', null, null);
};
