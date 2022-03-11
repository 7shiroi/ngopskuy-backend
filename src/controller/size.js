const responseHandler = require('../helpers/responseHandler');
const sizeModel = require('../model/size');

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
  const { name, description } = req.body;
  const data = { name, description };
  if (!name || !description) {
    return responseHandler(res, 400, null, null, 'Please fill in all the fields', null);
  }
  const checkSize = await sizeModel.getSizeName(name);
  if (checkSize.length > 0) {
    return responseHandler(res, 400, null, null, 'Size already on the list', null);
  }
  const postNewSize = await sizeModel.addSize(data);
  if (postNewSize.affectedRows < 1) {
    return responseHandler(res, 500, null, null, 'Server error', null);
  }
  const getNewSize = await sizeModel.getSizeName(name);
  if (getNewSize.length < 1) {
    return responseHandler(res, 500, null, null, 'Server error', null);
  }
  return responseHandler(res, 200, 'Successfully add new size', getNewSize[0], null, null);
};

exports.updateSize = async (req, res) => {
  const { id } = req.params;
  const data = {};
  const dataName = ['name', 'description'];
  dataName.forEach((x) => {
    if (req.body[x]) {
      data[x] = req.body[x];
    }
  });
  if (!id) {
    return responseHandler(res, 400, null, null, 'Undefined ID', null);
  }
  if (id < 1 || Number.isNaN(Number(id))) {
    return responseHandler(res, 400, null, null, 'ID should be a number greater than 0', null);
  }
  if (Object.keys(data).length < 1) {
    return responseHandler(res, 400, null, null, 'Null data', null);
  }
  const checkID = await sizeModel.getSizeId(id);
  if (checkID.length < 1) {
    return responseHandler(res, 404, null, null, 'Size not found', null);
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
