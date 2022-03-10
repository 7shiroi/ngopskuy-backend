const responseHandler = require('../helpers/responseHandler');
const productModel = require('../model/product');
const upload = require('../helpers/upload').single('image');

const { APP_URL } = process.env;

exports.getProduct = async (req, res) => {
  let {
    name, minPrice, maxPrice, page, limit,
  } = req.query;
  name = name || '';
  minPrice = parseInt(minPrice, 10) || 0;
  maxPrice = parseInt(maxPrice, 10) || 1000000;
  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 12;
  const offset = (page - 1) * limit;
  const dataName = ['name', 'priceMin', 'priceMax'];
  const data = {
    name, minPrice, maxPrice, page, limit, offset,
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
  const getDataProduct = await productModel.getProduct(data); // Get products
  if (getDataProduct.length < 1) {
    return responseHandler(res, 404, 'Data not found');
  }
  return responseHandler(res, 200, 'List of products', getDataProduct, null, pageInfo);
};

exports.addProduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return responseHandler(res, 400, null, null, err.message, null);
    }
    const {
      name, idCategory, price, description, stock, deliveryHourStart, deliveryHourEnd,
    } = req.body;
    let image = '';
    if (req.file) {
      image = `${APP_URL}/${req.file.destination}${req.file.filename}`;
    }
    const data = {
      name, idCategory, price, description, stock, deliveryHourStart, deliveryHourEnd, image,
    };
    const postNewProduct = await productModel.addProduct(data);
    if (postNewProduct.affectedRows < 1) {
      return responseHandler(res, 500, null, null, err.message, null);
    }
    const getNewProduct = await productModel.getProductById(postNewProduct.insertId);
    if (getNewProduct.length < 1) {
      return responseHandler(res, 500, null, err.message, null);
    }
    return responseHandler(res, 200, 'Successfully add new product', getNewProduct, null, null);
  });
};

// exports.editProduct = (req, res) => {
//   const { id } = req.params;
//   upload(req, res, async (err) => {
//     if (err) {
//       return responseHandler(res, 400, null, null, err.message, null);
//     }
//     const dataName = ['name', 'idCategory', 'price', 'description', 'stock', 'deliveryHourStart', 'deliveryHourEnd'];
//     const data = {};
//     dataName.forEach((x) => {
//       if (req.body[x]) {
//         data[x] = req.body[x];
//       }
//     });
//     console.log(id);
//     if (!id) {
//       return responseHandler(res, 400, null, null, 'Undefined ID', null);
//     }
//     if (req.file) {
//       data.image = `${APP_URL}/${req.file.destination}${req.file.filename}`;
//     }
//     const editData = await productModel.editProduct(data, id);
//     if (editData.affectedRows < 1) {
//       return responseHandler(res, 500, null, null, 'Server error', null);
//     }
//     const getEditedData = await productModel.getProductById(id);
//     if (getEditedData.length < 1) {
//       return responseHandler(res, 500, null, null, 'Server error', null);
//     }
//     return responseHandler(res, 200, 'Successfully edited data', getEditedData[0], null, null);
//   });
// };
