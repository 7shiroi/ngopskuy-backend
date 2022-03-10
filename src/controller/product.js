const isNumber = require('../helpers/checkDataType');
const isNull = require('../helpers/isNull');
const responseHandler = require('../helpers/responseHandler');
const isTime = require('../helpers/timeValidator');
const productModel = require('../model/product');
const upload = require('../helpers/upload').single('image');

const { APP_URL } = process.env;

exports.getProduct = async (req, res) => {
  let {
    name, minPrice, maxPrice, page, limit,
  } = req.query;
  const { idCategory } = req.query;
  name = name || '';
  minPrice = parseInt(minPrice, 10) || 0;
  maxPrice = parseInt(maxPrice, 10) || 1000000;
  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 12;
  const offset = (page - 1) * limit;
  const dataName = ['name', 'priceMin', 'priceMax', 'idCategory'];
  const data = {
    name, minPrice, maxPrice, idCategory, page, limit, offset,
  };
  let url = `${APP_URL}/product?`;
  dataName.forEach((x) => {
    if (data[x]) {
      url = `${url}${x}=${data[x]}&`;
    }
  });
  const getTotalProduct = await productModel.getTotalData(data); // Get total data
  const last = Math.ceil(getTotalProduct[0].totalData / limit);
  const pageInfo = {
    prev: page > 1 ? `${url}page=${page - 1}&limit=${limit}` : null,
    next: page < last ? `${url}page=${page + 1}&limit=${limit}` : null,
    currentPage: page,
    lastPage: last,
  };
  if (idCategory && idCategory > 0) {
    const getDataByCategory = await productModel.getProductByCategory(data);
    if (getDataByCategory.length < 0) {
      return responseHandler(res, 404, null, null, 'Data not found');
    }
    return responseHandler(res, 200, 'List of products', getDataByCategory, null, null);
  }
  const getDataProduct = await productModel.getProduct(data); // Get products
  if (getDataProduct.length < 1) {
    return responseHandler(res, 404, 'Data not found');
  }
  return responseHandler(res, 200, 'List of products', getDataProduct, null, pageInfo);
};

exports.getProductId = async (req, res) => {
  const { id } = req.params;
  if (id < 1 || Number.isNaN(Number(id))) {
    return responseHandler(res, 400, null, null, 'ID should be a number greater than 0', null);
  }
  const checkProduct = await productModel.getProductById(id);
  if (checkProduct.length < 1) {
    return responseHandler(res, 404, null, null, 'Data not found', null);
  }
  return responseHandler(res, 200, 'Product', checkProduct[0], null, null);
};

exports.addProduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return responseHandler(res, 400, null, null, err.message, null);
    }
    const {
      name, idCategory, price, description, stock, deliveryHourStart, deliveryHourEnd,
    } = req.body;
    const dataName = ['name', 'idCategory', 'price', 'description', 'stock', 'deliveryHourStart', 'deliveryHourEnd'];
    const dataNumber = ['idCategory', 'price', 'stock'];
    let image = '';
    if (req.file) {
      image = `${APP_URL}/${req.file.destination}${req.file.filename}`;
    }
    const data = {
      name, idCategory, price, description, stock, deliveryHourStart, deliveryHourEnd, image,
    };
    const checkNull = isNull(data, dataName);
    if (checkNull > 0) {
      return responseHandler(res, 400, null, null, 'Please fill in all the field', null);
    }
    const checkNumber = isNumber(data, dataNumber);
    if (checkNumber > 0) {
      return responseHandler(res, 400, null, null, 'Category ID, price and stock should be a number', null);
    }
    const changeTimeS = isTime(deliveryHourStart); // Time validation
    const changeTimeE = isTime(deliveryHourEnd);
    if (changeTimeS === 'Invalid date' || changeTimeE === 'Invalid date') {
      return responseHandler(res, 400, null, null, 'Invalid time format', null);
    }
    data.deliveryHourStart = changeTimeS; // Change time into 24-hour format
    data.deliveryHourEnd = changeTimeE; // Change time into 24-hour format

    const checkProduct = await productModel.getProductByName(data.name); // Check if product exist
    if (checkProduct.length > 0) {
      return responseHandler(res, 400, null, null, 'Product already on the list', null);
    }
    const postNewProduct = await productModel.addProduct(data); // Post new product
    if (postNewProduct.affectedRows < 1) {
      return responseHandler(res, 500, null, null, err.message, null);
    }
    // Get new input product
    const getNewProduct = await productModel.getProductById(postNewProduct.insertId);
    if (getNewProduct.length < 1) {
      return responseHandler(res, 500, null, err.message, null);
    }
    return responseHandler(res, 200, 'Successfully add new product', getNewProduct, null, null);
  });
};

exports.editProduct = (req, res) => {
  const { id } = req.params;
  upload(req, res, async (err) => {
    if (err) {
      return responseHandler(res, 400, null, null, err.message, null);
    }
    if (!id) {
      return responseHandler(res, 400, null, null, 'Undefined ID', null);
    }
    const dataName = ['name', 'idCategory', 'price', 'description', 'stock', 'deliveryHourStart', 'deliveryHourEnd'];
    const dataNumber = ['idCategory', 'price', 'stock'];
    const data = {};
    dataName.forEach((x) => {
      if (req.body[x]) {
        data[x] = req.body[x];
      }
    });
    if (req.file) {
      data.image = `${APP_URL}/${req.file.destination}${req.file.filename}`;
    }
    const checkNumber = isNumber(data, dataNumber);
    if (checkNumber > 0) {
      return responseHandler(res, 400, null, null, 'Category ID, price and stock should be a number', null);
    }
    const changeTimeS = isTime(data.deliveryHourStart); // Time validation
    const changeTimeE = isTime(data.deliveryHourEnd);
    if (changeTimeS === 'Invalid date' || changeTimeE === 'Invalid date') {
      return responseHandler(res, 400, null, null, 'Invalid time format', null);
    }
    data.deliveryHourStart = changeTimeS; // Change time into 24-hour format
    data.deliveryHourEnd = changeTimeE; // Change time into 24-hour format
    const getData = await productModel.getProductById(id);
    if (getData.length < 1) {
      return responseHandler(res, 404, null, null, 'Data not found', null);
    }
    const editData = await productModel.editProduct(data, id);
    if (editData.affectedRows < 1) {
      return responseHandler(res, 500, null, null, 'Server error', null);
    }
    const getEditedData = await productModel.getProductById(id);
    if (getEditedData.length < 1) {
      return responseHandler(res, 500, null, null, 'Server error', null);
    }
    return responseHandler(res, 200, 'Successfully edited data', getEditedData[0], null, null);
  });
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return responseHandler(res, 400, null, null, 'Undefined ID', null);
  }
  if (id < 1 || Number.isNaN(Number(id))) {
    return responseHandler(res, 400, null, null, 'ID should be a number greater than 0');
  }
  const getDataProduct = await productModel.getProductById(id);
  if (getDataProduct.length < 1) {
    return responseHandler(res, 404, null, null, 'Product not found', null);
  }
  const deleteData = await productModel.deleteProduct(id);
  if (deleteData.affectedRows < 1) {
    return responseHandler(res, 500, null, null, 'Server error', null);
  }
  return responseHandler(res, 200, 'Successfully deleted data', null, null, null);
};
