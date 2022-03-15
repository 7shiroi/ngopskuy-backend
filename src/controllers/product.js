const responseHandler = require('../helpers/responseHandler');
const { inputValidator, checkIntegerFormat } = require('../helpers/validator');
const productModel = require('../models/product');
const categoryModel = require('../models/category');
const { deleteFile } = require('../helpers/fileHandler');
const { cloudPathToFileName } = require('../helpers/converter');

const { APP_URL } = process.env;

const filterQueryValidation = (data) => {
  const error = [];
  if (data.idCategory !== undefined && !checkIntegerFormat(data.idCategory)) {
    error.push('IdCategory query invalid');
  }

  if (data.minPrice !== undefined && !checkIntegerFormat(data.minPrice)) {
    error.push('Minimal price query invalid!');
  }
  if (data.maxPrice !== undefined && !checkIntegerFormat(data.maxPrice)) {
    error.push('Minimal price query invalid!');
  }

  if (data.page !== undefined && !checkIntegerFormat(data.page)) {
    error.push('Page query invalid!');
  }
  if (data.limit !== undefined && !checkIntegerFormat(data.limit)) {
    error.push('Limit query invalid!');
  }
  return error;
};

exports.getProduct = async (req, res) => {
  let {
    name, minPrice, maxPrice, page, limit,
  } = req.query;
  const { idCategory } = req.query;
  name = name || '';
  minPrice = parseInt(minPrice, 10);
  maxPrice = parseInt(maxPrice, 10);
  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 12;
  const offset = (page - 1) * limit;
  const dataName = ['name', 'minPrice', 'maxPrice', 'id_category'];
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
    totalData: getTotalProduct[0].totalData,
    currentPage: page,
    lastPage: last,
  };
  if (idCategory && idCategory > 0) {
    const getDataByCategory = await productModel.getProductByCategory(data);
    if (getDataByCategory.length < 0) {
      return responseHandler(res, 404, null, null, 'Data not found');
    }
    return responseHandler(res, 200, 'List of products', getDataByCategory, null, pageInfo);
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

exports.addProduct = async (req, res) => {
  try {
    const fillable = [
      {
        field: 'name', required: true, type: 'varchar', max_length: 100,
      },
      {
        field: 'id_category', required: true, type: 'varchar', max_length: 100,
      },
      {
        field: 'price', required: true, type: 'price',
      },
      {
        field: 'description', required: true, type: 'text',
      },
      {
        field: 'stock', required: true, type: 'integer',
      },
      {
        field: 'delivery_hour_start', required: true, type: 'time',
      },
      {
        field: 'delivery_hour_end', required: true, type: 'time',
      },
    ];
    const { data, error } = inputValidator(req, fillable);

    if (req.file) {
      data.image = req.file.path;
    }
    if (error.length > 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, error);
    }

    const checkProduct = await productModel.getProductByName(data.name); // Check if product exist
    if (checkProduct.length > 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, 'Product already on the list', null);
    }
    const checkCategory = await categoryModel.getCategoryId(data.id_category);
    if (checkCategory.length === 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, 'Category not found', null);
    }
    const postNewProduct = await productModel.addProduct(data); // Post new product
    if (postNewProduct.affectedRows < 1) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 500, null, null, 'Server error', null);
    }
    const getNewProduct = await productModel.getProductById(postNewProduct.insertId);
    if (getNewProduct.length < 1) {
      return responseHandler(res, 500, null, null, 'Server error', null);
    }
    return responseHandler(res, 200, 'Successfully add new product', getNewProduct, null, null);
  } catch (error) {
    if (req.file) {
      deleteFile(req.file.filename);
    }
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, 'Undefined ID', null);
    }

    const getData = await productModel.getProductById(id);
    if (getData.length < 1) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 404, null, null, 'Data product not found', null);
    }
    const fillable = [
      {
        field: 'name', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'id_category', required: false, type: 'varchar', max_length: 100,
      },
      {
        field: 'price', required: false, type: 'price',
      },
      {
        field: 'description', required: false, type: 'texy',
      },
      {
        field: 'stock', required: false, type: 'integer',
      },
      {
        field: 'delivery_hour_start', required: false, type: 'time',
      },
      {
        field: 'delivery_hour_end', required: false, type: 'time',
      },
    ];
    const { data, error } = inputValidator(req, fillable);
    if (error.length > 0) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, error);
    }
    if (Object.keys(data).length < 1) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 400, null, null, 'New data is empty', null);
    }
    if (data.name) {
      const getDataByName = await productModel.getProductByName(data);
      if (getDataByName.length > 0 && getDataByName[0].id !== parseInt(id, 10)) {
        if (req.file) {
          deleteFile(req.file.filename);
        }
        return responseHandler(res, 400, null, null, 'Product already on the list', null);
      }
    }
    if (req.file) {
      if (getData[0].image) {
        deleteFile(cloudPathToFileName(getData[0].image));
      }
      data.image = req.file.path;
    }
    const editData = await productModel.editProduct(data, id);
    if (editData.affectedRows < 1) {
      if (req.file) {
        deleteFile(req.file.filename);
      }
      return responseHandler(res, 500, null, null, 'Server error', null);
    }
    const getEditedData = await productModel.getProductById(id);
    if (getEditedData.length < 1) {
      return responseHandler(res, 500, null, null, 'Server error', null);
    }
    return responseHandler(res, 200, 'Successfully edited data', getEditedData[0], null, null);
  } catch (error) {
    if (req.file) {
      deleteFile(req.file.filename);
    }
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return responseHandler(res, 400, null, null, 'Undefined ID', null);
  }
  if (id < 1 || Number.isNaN(Number(id))) {
    return responseHandler(res, 400, null, null, 'ID should be a number greater than 0', null);
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

exports.getFavoriteProducts = async (req, res) => {
  try {
    let {
      name, minPrice, maxPrice, page, limit,
    } = req.query;
    const { idCategory } = req.query;
    const { error } = filterQueryValidation({
      minPrice, maxPrice, idCategory, page, limit,
    });
    if (error) {
      return responseHandler(res, 400, null, null, error);
    }
    name = name || '';
    minPrice = parseInt(minPrice, 10);
    maxPrice = parseInt(maxPrice, 10);
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 12;
    const offset = (page - 1) * limit;
    const dataName = ['name', 'priceMin', 'priceMax', 'id_category'];
    const data = {
      name, minPrice, maxPrice, idCategory, page, limit, offset,
    };
    if (data.idCategory) {
      const checkCategory = categoryModel.getCategoryId(data.idCategory);
      if (checkCategory.length === 0) {
        return responseHandler(res, 400, null, null, `Category with id ${data.id_category} is not existed`);
      }
    }

    let url = `${APP_URL}/product?`;
    dataName.forEach((x) => {
      if (data[x]) {
        url = `${url}${x}=${data[x]}&`;
      }
    });

    const getFavoriteProductsCount = await productModel.getFavoriteProductsCount(data);
    const last = Math.ceil(getFavoriteProductsCount[0].rowsCount / limit);
    const results = await productModel.getFavoriteProducts(data);
    const pageInfo = {
      prev: page > 1 ? `${url}page=${page - 1}&limit=${limit}` : null,
      next: page < last ? `${url}page=${page + 1}&limit=${limit}` : null,
      totalData: getFavoriteProductsCount[0].rowsCount,
      currentPage: page,
      lastPage: last,
    };
    if (results.length === 0) {
      return responseHandler(res, 400, 'There is no favorite product right now');
    }
    return responseHandler(res, 200, 'Favorite Product List', results, null, pageInfo);
  } catch (error) {
    return responseHandler(res, 500, null, null, 'Unexpected Error');
  }
};
