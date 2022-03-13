const responseHandler = require('../helpers/responseHandler');
const categoryModel = require('../models/category');

exports.getCategory = async (req, res) => {
  const getAllCategories = await categoryModel.getCategory();
  if (getAllCategories.length < 1) {
    return responseHandler(res, 404, null, null, 'Data not found', null);
  }
  return responseHandler(res, 200, 'Category list', getAllCategories, null, null);
};

exports.getCategoryId = async (req, res) => {
  const { id } = req.params;
  if (id < 1 || Number.isNaN(Number(id))) {
    return responseHandler(res, 400, null, null, 'ID should be a number greater than 0', null);
  }
  const getData = await categoryModel.getCategoryId(id);
  if (getData.length < 1) {
    return responseHandler(res, 404, null, null, 'Data not found', null);
  }
  return responseHandler(res, 200, 'Category detail', getData[0], null, null);
};

exports.addCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return responseHandler(res, 400, null, null, 'Please fill in the name field', null);
  }
  const checkName = await categoryModel.getCategoryByName(name); // Check if category allready exist
  if (checkName.length > 0) {
    return responseHandler(res, 400, null, null, 'Category already exist', null);
  }
  const addNewCategory = await categoryModel.addCategory(name);
  if (addNewCategory.affectedRows < 1) {
    return responseHandler(res, 500, null, null, 'Server error', null);
  }
  const getNewCategory = await categoryModel.getCategoryId(addNewCategory.insertId); // Get new data
  if (getNewCategory.length < 1) {
    return responseHandler(res, 500, null, null, 'Server error', null);
  }
  return responseHandler(res, 200, 'Successfully add new product category', getNewCategory[0], null, null);
};

exports.editCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!id) {
    return responseHandler(res, 400, null, null, 'Please input category id', null);
  }
  if (id < 1 || Number.isNaN(Number(id))) {
    return responseHandler(res, 400, null, null, 'ID Should be a number greater than 0', null);
  }
  if (!name) {
    return responseHandler(res, 400, null, null, 'Please fill in the name field', null);
  }
  const checkCategory = await categoryModel.getCategoryId(id); // Check if id exist
  if (checkCategory.length < 1) {
    return responseHandler(res, 400, null, null, 'Category not found', null);
  }
  const checkName = await categoryModel.getCategoryByName(name); // Check if category allready exist
  if (checkName.length > 0) {
    return responseHandler(res, 400, null, null, 'Category already exist', null);
  }
  const data = {
    id, name,
  };
  const editCategory = await categoryModel.editCategory(data);
  if (editCategory.affectedRows < 1) {
    return responseHandler(res, 500, null, null, 'Server error', null);
  }
  const getCategory = await categoryModel.getCategoryId(data.id);
  if (getCategory.length < 1) {
    return responseHandler(res, 500, null, null, 'Server error', null);
  }
  return responseHandler(res, 200, 'Successfully edit category', getCategory[0], null, null);
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return responseHandler(res, 400, null, null, 'Undefined ID', null);
  }
  if (id < 1 || Number.isNaN(Number(id))) {
    return responseHandler(res, 400, null, null, 'ID Should be a number greater than 0', null);
  }
  const checkCategory = await categoryModel.getCategoryId(id); // Check if id exist
  if (checkCategory.length < 1) {
    return responseHandler(res, 400, null, null, 'Category not found', null);
  }
  const deleteCategory = await categoryModel.deleteCategory(id);
  if (deleteCategory.affectedRows < 1) {
    return responseHandler(res, 500, null, null, 'Server error', null);
  }
  return responseHandler(res, 200, 'Successfully deleted category', null, null, null);
};
